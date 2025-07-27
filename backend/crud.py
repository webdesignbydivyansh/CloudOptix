from sqlalchemy.orm import Session
from models import CloudResource
from schemas import Recommendation
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

def get_all_resources(db: Session):
    try:
        return db.query(CloudResource).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch resources")


def get_optimization_recommendations(db: Session):
    try:
        recommendations = []

        resources = db.query(CloudResource).all()

        for res in resources:
            if res.type == "instance":
                if (res.cpu_utilization or 0) < 30 and (res.memory_utilization or 0) < 50:
                    savings = res.monthly_cost * 0.5
                    confidence = "High" if savings > 75 else "Medium"
                    recommendations.append(Recommendation(
                        resource_id=res.id,
                        name=res.name,
                        current_monthly_cost=res.monthly_cost,
                        recommendation="Consider downsizing instance.",
                        estimated_savings=round(savings, 2),
                        confidence=confidence,
                        reasoning="CPU utilization< 30% or Memory utilization< 50%, can downsize"
                    ))
            elif res.type == "storage":
                if (res.size_gb or 0) > 500:
                    savings = res.monthly_cost * 0.3
                    confidence = "Medium" if savings < 50 else "High"
                    recommendations.append(Recommendation(
                        resource_id=res.id,
                        name=res.name,
                        current_monthly_cost=res.monthly_cost,
                        recommendation="Reduce storage volume size.",
                        estimated_savings=round(savings, 2),
                        confidence=confidence,
                        reasoning="Storage > 500GB, can reduce"
                    ))
        return recommendations
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")
