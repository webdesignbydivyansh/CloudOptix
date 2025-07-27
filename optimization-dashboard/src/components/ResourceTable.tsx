import React from "react";
import { CloudResource } from "../types";
import "../styles/ResourceTable.css";

type Props = {
  resources: CloudResource[];
};

const ResourceTable: React.FC<Props> = ({ resources }) => {
  return (
    <div className="resource-table-wrapper">
      <h2>Cloud Resources</h2>
      <table className="resource-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Provider</th>
            <th>CPU %</th>
            <th>Memory %</th>
            <th>Storage %</th>
            <th>Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.type}</td>
              <td>{res.provider}</td>
              <td className={(res.cpu_utilization!>0 && res.memory_utilization!>0 && res.cpu_utilization!<30 && res.memory_utilization!<50)? "low-util" : "" }>{res.cpu_utilization?.toFixed(1) ?? 'N/A'}</td>
              <td className={(res.cpu_utilization!>0 && res.memory_utilization!>0 && res.cpu_utilization!<30 && res.memory_utilization!<50)? "low-util" : "" }>{res.memory_utilization?.toFixed(1) ?? 'N/A'}</td>
              <td className={res.storage_utilization!>500? "high-util" : ""}>{res.storage_utilization?.toFixed(1) ?? 'N/A'}</td>
              <td>{res.monthly_cost?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
