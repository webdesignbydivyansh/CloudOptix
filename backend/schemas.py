from pydantic import BaseModel
from typing import Optional

class CloudResourceSchema(BaseModel):
    id: int
    name: str
    type: str
    provider: str
    instance_type: Optional[str]
    size_gb: Optional[int]
    cpu_utilization: Optional[float]
    memory_utilization: Optional[float]
    storage_utilization: Optional[float]
    monthly_cost: float

    model_config = {
        "from_attributes": True
    }   


class Recommendation(BaseModel):
    resource_id: int
    name: str
    current_monthly_cost: float
    recommendation: str
    estimated_savings: float
    confidence: str
    reasoning: str
