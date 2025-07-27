from fastapi import FastAPI, Depends, Request
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from crud import get_all_resources, get_optimization_recommendations
from schemas import CloudResourceSchema, Recommendation
from typing import List
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/resources", response_model=List[CloudResourceSchema])
def read_resources(db: Session = Depends(get_db)):
    return get_all_resources(db)

@app.get("/recommendations", response_model=List[Recommendation])
def read_recommendations(db: Session = Depends(get_db)):
    return get_optimization_recommendations(db)

@app.exception_handler(SQLAlchemyError)
async def db_exception_handler(_: Request, exc: SQLAlchemyError):
    logging.error(f"Database error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal database error. Please try again later."}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"error": "Invalid request format", "details": exc.errors()}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(_: Request, exc: Exception):
    logging.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error. Please contact support."}
    )