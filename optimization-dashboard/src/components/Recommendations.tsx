import React, { useEffect, useState } from 'react';
import '../styles/Recommendation.css';

type Recommendation = {
  id: number;
  resource_id: number;
  name: string;
  reasoning: string;
  recommendation: string;
  current_monthly_cost: number;
  estimated_savings: number;
  confidence: string;
  implemented: boolean;
};

  

const RecommendationComponent: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:8000/recommendations');
        const data = await response.json();
        console.log("Fetched Recommendations:", data); 
        setRecommendations(data);
      } catch (err) {
        setError('Failed to fetch recommendations');
      }
    };

    fetchRecommendations();
  }, []);

  const markAsImplemented = async (id: number) => {
    try {

      setRecommendations(prev =>
        prev.map(r =>
          r.resource_id === id ? { ...r, implemented: true } : r
        )
      );
    } catch (err) {
      alert('Failed to mark as implemented');
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Optimization Recommendations</h2>
      {error && <p className="error">{error}</p>}
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <table className="recommendation-table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Confidence</th>
              <th>Current Cost</th>
              <th>Savings</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map(rec => (
              <tr key={rec.resource_id } >
                <td>{rec.name}</td>
                <td>{rec.recommendation}</td>
                <td>{rec.reasoning}</td>
                <td>{rec.confidence}</td>
                <td>{typeof rec.current_monthly_cost === 'number' ? '$'+rec.current_monthly_cost.toFixed(2) : 'N/A'}</td>
                <td>{typeof rec.estimated_savings === 'number' ? '$'+rec.estimated_savings.toFixed(2) : 'N/A'}</td>
                <td>{rec.implemented ? 'Completed' : 'Pending'}</td>
                <td>
                {rec.implemented ? 
                    "✅ Implemented"
                : (
                  <button onClick={() => {markAsImplemented(rec.resource_id)
                  }}>
                    Mark as Implemented
                  </button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecommendationComponent;
