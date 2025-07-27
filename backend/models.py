from sqlalchemy import Column, Integer, String, Float, TIMESTAMP
from database import Base

class CloudResource(Base):
    __tablename__ = "cloud_resources"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    instance_type = Column(String, nullable=True)
    size_gb = Column(Integer, nullable=True)
    cpu_utilization = Column(Float, nullable=True)
    memory_utilization = Column(Float, nullable=True)
    storage_utilization = Column(Float, nullable=True)
    monthly_cost = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP)
