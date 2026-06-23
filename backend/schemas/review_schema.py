from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Request schemas
class CodeReviewRequest(BaseModel):
    code: str = Field(..., description="Source code to review")
    language: str = Field(..., description="Programming language")
    
    class Config:
        json_schema_extra = {
            "example": {
                "code": "def hello():\n    print('Hello World')",
                "language": "python"
            }
        }

# Response schemas
class Bug(BaseModel):
    line: int
    severity: str  # critical, warning, info
    description: str
    fix: str

class SecurityIssue(BaseModel):
    line: int
    issue: str
    recommendation: str

class PerformanceIssue(BaseModel):
    line: int
    suggestion: str

class QualityMetrics(BaseModel):
    score: int = Field(..., ge=0, le=100)
    readability: str
    maintainability: str

class CodeReviewResponse(BaseModel):
    bugs: List[Bug]
    security: List[SecurityIssue]
    performance: List[PerformanceIssue]
    quality: QualityMetrics
    summary: str
    fixed_code: str

class ReviewHistoryItem(BaseModel):
    id: str
    language: str
    original_code: str
    review_json: str
    score: Optional[int]
    created_at: str
    
    class Config:
        from_attributes = True
