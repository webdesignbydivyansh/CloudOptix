import React from "react";
import { CloudResource, Recommendation } from "../types";
import "../styles/Summary.css";

type Props = {
  resources: CloudResource[];
  recommendations: Recommendation[];
};

const Summary: React.FC<Props> = ({ resources, recommendations }) => {
  const totalResources = resources.length;
  const totalCost = resources.reduce((sum, r) => sum + (r.monthly_cost || 0), 0);
  const totalSavings = recommendations.reduce(
    (sum, rec) => sum + (rec.estimated_savings || 0),
    0
  );
  const optimizationCount = recommendations.length;

  return (
    <div className="summary-container">
      <div className="summary-item">
        <h3>Total Resources</h3>
        <p>{totalResources}</p>
      </div>
      <div className="summary-item">
        <h3>Monthly Cost</h3>
        <p>${totalCost.toFixed(2) ?? 'N/A'}</p>
      </div>
      <div className="summary-item">
        <h3>Potential Savings</h3>
        <p>${totalSavings.toFixed(2) ?? 'N/A'}</p>
      </div>
      <div className="summary-item">
        <h3>Optimization Opportunities</h3>
        <p>{optimizationCount}</p>
      </div>
    </div>
  );
};

export default Summary;
