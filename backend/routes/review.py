from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from schemas.review_schema import CodeReviewRequest, CodeReviewResponse
from services.gemini_service import review_code_with_gemini, review_code_streaming
from services.code_parser import validate_code, detect_language
from database import get_db
from models.review_model import Review
import json

router = APIRouter()

@router.post("/review", response_model=CodeReviewResponse)
async def review_code(request: CodeReviewRequest, db: Session = Depends(get_db)):
    """
    Review code using Google Gemini AI (FREE!) and save to database
    """
    # Validate code
    if not validate_code(request.code):
        raise HTTPException(
            status_code=400,
            detail="Invalid code: must be non-empty and less than 50KB"
        )
    
    # Auto-detect language if needed
    language = request.language.lower()
    if language == "auto":
        language = detect_language(request.code)
    
    try:
        # Get AI review using Gemini (FREE!)
        review_result = await review_code_with_gemini(request.code, language)
        
        # Save to database
        review_record = Review(
            Language=language,
            OriginalCode=request.code,
            ReviewJson=json.dumps(review_result),
            Score=review_result.get("quality", {}).get("score", 0)
        )
        db.add(review_record)
        db.commit()
        db.refresh(review_record)
        
        return review_result
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error reviewing code: {str(e)}"
        )

@router.post("/review/stream")
async def review_code_stream(request: CodeReviewRequest):
    """
    Stream code review response from Claude AI (SSE)
    """
    # Validate code
    if not validate_code(request.code):
        raise HTTPException(
            status_code=400,
            detail="Invalid code: must be non-empty and less than 50KB"
        )
    
    # Auto-detect language if needed
    language = request.language.lower()
    if language == "auto":
        language = detect_language(request.code)
    
    async def event_generator():
        try:
            async for chunk in review_code_streaming(request.code, language):
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
