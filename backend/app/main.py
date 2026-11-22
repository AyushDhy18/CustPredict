
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="CustPredict API",
    description="Customer Behaviour Analysis and Predictive Analytics System",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "CustPredict API is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "application": "CustPredict",
        "version": "1.0.0"
    }
