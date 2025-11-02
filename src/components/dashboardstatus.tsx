// src/components/DashboardStats.tsx
import React from "react";
import { Project } from "../models";
import { countPaidUnpaid } from "../utils";

export const DashboardStats: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const totals = projects.length;
  const { paid, unpaid } = countPaidUnpaid(projects);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 border rounded">
        <div className="text-sm">Total Projects</div>
        <div className="text-2xl font-bold">{totals}</div>
      </div>
      <div className="p-3 border rounded">
        <div className="text-sm">Paid</div>
        <div className="text-2xl font-bold">{paid}</div>
      </div>
      <div className="p-3 border rounded">
        <div className="text-sm">Unpaid</div>
        <div className="text-2xl font-bold">{unpaid}</div>
      </div>
    </div>
  );
};
