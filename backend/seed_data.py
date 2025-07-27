from sqlalchemy.orm import Session
from database import SessionLocal
from models import CloudResource
from datetime import datetime

# Sample resources to insert
sample_resources = [
    # Over-provisioned instances
    {
        "name": "web-server-1", "type": "instance", "provider": "AWS",
        "instance_type": "t3.xlarge", "cpu_utilization": 15, "memory_utilization": 25,
        "monthly_cost": 150
    },
    {
        "name": "api-server-2", "type": "instance", "provider": "AWS",
        "instance_type": "m5.large", "cpu_utilization": 12, "memory_utilization": 30,
        "monthly_cost": 90
    },
    {
        "name": "worker-3", "type": "instance", "provider": "Azure",
        "instance_type": "Standard_D2s_v3", "cpu_utilization": 8, "memory_utilization": 20,
        "monthly_cost": 70
    },

    # Well-utilized instances
    {
        "name": "database-1", "type": "instance", "provider": "AWS",
        "instance_type": "m5.xlarge", "cpu_utilization": 75, "memory_utilization": 85,
        "monthly_cost": 180
    },
    {
        "name": "cache-server", "type": "instance", "provider": "GCP",
        "instance_type": "n1-standard-2", "cpu_utilization": 65, "memory_utilization": 70,
        "monthly_cost": 50
    },

    # Under-utilized storage
    {
        "name": "backup-storage", "type": "storage", "provider": "AWS",
        "size_gb": 1000, "storage_utilization": 1000,
        "monthly_cost": 100
    },
    {
        "name": "log-storage", "type": "storage", "provider": "Azure",
        "size_gb": 500, "storage_utilization": 500,
        "monthly_cost": 75
    },

    # Well-utilized storage
    {
        "name": "database-storage", "type": "storage", "provider": "AWS",
        "size_gb": 200, "storage_utilization": 200,
        "monthly_cost": 25
    },
]

def seed_data():
    db: Session = SessionLocal()
    try:
        if db.query(CloudResource).first():
            print("Data already exists, skipping seeding.")
            return

        for res in sample_resources:
            db.add(CloudResource(**res, created_at=datetime.utcnow()))
        db.commit()
        print("Sample data inserted successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
