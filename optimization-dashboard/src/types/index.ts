export interface CloudResource {
    id: number;
    name: string;
    type: string;
    provider: string;
    instance_type?: string;
    size_gb?: number;
    cpu_utilization?: number;
    memory_utilization?: number;
    storage_utilization?: number;
    monthly_cost: number;
    created_at: string;
  }
  
  export interface Recommendation {
    id: number;
    resource_id: number;
    name: string;
    recommendation: string;
    estimated_savings: number;
    confidence: string;
    implemented: boolean;
  }
  