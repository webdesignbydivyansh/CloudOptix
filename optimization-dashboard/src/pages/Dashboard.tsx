import React, { useEffect, useState } from "react";
import { CloudResource, Recommendation } from "../types";
import ResourceTable from "../components/ResourceTable";
import Summary from "../components/Summary";
import Recommendations from "../components/Recommendations";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [resources, setResources] = useState<CloudResource[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, recRes] = await Promise.all([
          fetch("http://localhost:8000/resources"),
          fetch("http://localhost:8000/recommendations"),
        ]);

        if (!resRes.ok || !recRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const resourceData = await resRes.json();
        const recommendationData = await recRes.json();

        setResources(resourceData);
        setRecommendations(recommendationData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error"> {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Cloud Optimization Dashboard</h1>
      <Summary resources={resources} recommendations={recommendations} />
      <ResourceTable resources={resources} />
      <Recommendations />
    </div>
  );
};

export default Dashboard;
