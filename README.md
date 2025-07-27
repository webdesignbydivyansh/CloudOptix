CloudOptix
CloudOptix is a full-stack application for monitoring cloud infrastructure, optimizing resource usage, and reducing monthly costs. It provides detailed insights into utilization, highlights inefficiencies, and recommends improvements.

📦 Tech Stack

Frontend: React (with Hooks), TypeScript, CSS

Backend: FastAPI (Python)

Database: PostgreSQL

ORM: SQLAlchemy

🚀 Setup Instructions

Backend (FastAPI + PostgreSQL)

Clone the repo

git clone https://github.com/yourusername/cloudoptix.git

cd cloudoptix/backend

Create virtual environment

python -m venv env

source env/bin/activate  # Mac/Linux

env\Scripts\activate   # Windows

Install dependencies

pip install -r requirements.txt

Configure PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database named cloudoptuser

Update the database URL in main.py if needed.

Run the backend
uvicorn main:app —reload

Seed sample data (optional)

python seed_data.py

Frontend (React)

Navigate to frontend folder

cd ../frontend

Install dependencies

npm install

Start the development server

npm start

🔌 API Documentation
	
Base URL: http://localhost:8000
 
GET /resources

Returns a list of all cloud resources.

GET /recommendations
	
Returns optimization suggestions based on resource usage.

Example response:

{
    "resource_id": 1,
    "name": "web-server-1",
    "recommendation": "Consider downsizing instance.",
    "reasoning": "Low CPU usage detected.",
    "current_monthly_cost": 150,
    "estimated_savings": 75,
    "confidence": "High",
    "implemented": false
  }

🧮 Database Schema

cloud_resources

recommendations

🎯 Features

View summary stats: total resources, cost, and potential savings

Resource utilization dashboard (table view)

Optimization recommendations with confidence score

Mark recommendations as implemented

Responsive UI and real-time API integration

🌐 Live Demo

Coming soon

🙌 Acknowledgments

Inspired by real-world cloud cost challenges

Built using FastAPI + React + PostgreSQL

Built with 💡 by Divyansh Kushwaha
