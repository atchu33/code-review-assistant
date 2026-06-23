from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from database import get_db
from models.review_model import Review
from schemas.review_schema import ReviewHistoryItem

router = APIRouter()

@router.get("/history", response_model=List[ReviewHistoryItem])
async def get_review_history(
    language: Optional[str] = Query(None, description="Filter by language"),
    limit: int = Query(20, ge=1, le=100, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    db: Session = Depends(get_db)
):
    """
    Get review history with optional filtering
    """
    try:
        query = db.query(Review)
        
        # Filter by language if provided
        if language:
            query = query.filter(Review.Language == language.lower())
        
        # Order by most recent first
        query = query.order_by(desc(Review.CreatedAt))
        
        # Apply pagination
        reviews = query.offset(offset).limit(limit).all()
        
        # Convert to dict format
        return [review.to_dict() for review in reviews]
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching history: {str(e)}"
        )

@router.get("/history/{review_id}", response_model=ReviewHistoryItem)
async def get_review_by_id(review_id: str, db: Session = Depends(get_db)):
    """
    Get a specific review by ID
    """
    review = db.query(Review).filter(Review.Id == review_id).first()
    
    if not review:
        raise HTTPException(
            status_code=404,
            detail=f"Review with ID {review_id} not found"
        )
    
    return review.to_dict()

@router.delete("/history/{review_id}")
async def delete_review(review_id: str, db: Session = Depends(get_db)):
    """
    Delete a review from history
    """
    review = db.query(Review).filter(Review.Id == review_id).first()
    
    if not review:
        raise HTTPException(
            status_code=404,
            detail=f"Review with ID {review_id} not found"
        )
    
    try:
        db.delete(review)
        db.commit()
        return {"message": "Review deleted successfully", "id": review_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting review: {str(e)}"
        )

@router.get("/stats")
async def get_statistics(db: Session = Depends(get_db)):
    """
    Get overall statistics about reviews
    """
    try:
        total_reviews = db.query(Review).count()
        
        # Average score
        from sqlalchemy import func
        avg_score = db.query(func.avg(Review.Score)).scalar() or 0
        
        # Reviews by language
        language_stats = db.query(
            Review.Language,
            func.count(Review.Id).label('count')
        ).group_by(Review.Language).all()
        
        return {
            "total_reviews": total_reviews,
            "average_score": round(float(avg_score), 2),
            "by_language": [
                {"language": lang, "count": count}
                for lang, count in language_stats
            ]
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching statistics: {str(e)}"
        )
