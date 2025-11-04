// src/components/DashboardStats.tsx
import React from "react";
import { Project, Payment } from "../model";
import { countPaidUnpaid } from "../utils";

interface DashboardStatsProps {
  projects?: Project[];
  payments?: Payment[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  projects = [],
  payments = [],
}) => {
  const totals = projects.length;
  const { paid, unpaid } = countPaidUnpaid(projects);

  const totalPayments = projects
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Projects */}
      <div className="p-3 border rounded text-center">
        <div className="text-sm text-gray-500">Total Projects</div>
        <div className="text-2xl font-bold">{totals}</div>
      </div>

      {/* Paid Projects + Total Payments */}
      <div className="p-3 border rounded text-center flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row w-full">
          <div className="flex-1 text-center border-b sm:border-b-0 sm:border-r py-2 sm:py-0">
            <div className="text-sm text-gray-500">Paid Projects</div>
            <div className="text-2xl font-bold text-green-600">{paid}</div>
          </div>
          <div className="flex-1 text-center py-2 sm:py-0">
            <div className="text-sm text-gray-500">Total Payments</div>
            <div className="text-2xl font-bold text-blue-600">
              ${totalPayments.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Unpaid Projects */}
      <div className="p-3 border rounded text-center">
        <div className="text-sm text-gray-500">Unpaid Projects</div>
        <div className="text-2xl font-bold text-red-500">{unpaid}</div>
      </div>
    </div>
  );
};
