from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import review, history
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Code Review API",
    description="Intelligent code review",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",  # Added for your frontend
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(review.router, prefix="/api", tags=["review"])
app.include_router(history.router, prefix="/api", tags=["history"])

@app.get("/")
async def root():
    return {
        "message": "AI Code Review API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
