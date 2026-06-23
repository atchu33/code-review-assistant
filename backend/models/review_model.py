from sqlalchemy import Column, String, Integer, DateTime, Text
from sqlalchemy.sql import func
from database import Base
import uuid

class Review(Base):
    __tablename__ = "Reviews"
    
    Id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    Language = Column(String(50), nullable=False)
    OriginalCode = Column(Text, nullable=False)
    ReviewJson = Column(Text, nullable=False)
    Score = Column(Integer, nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())
    
    def to_dict(self):
        return {
            "id": self.Id,
            "language": self.Language,
            "original_code": self.OriginalCode,
            "review_json": self.ReviewJson,
            "score": self.Score,
            "created_at": self.CreatedAt.isoformat() if self.CreatedAt else None
        }
