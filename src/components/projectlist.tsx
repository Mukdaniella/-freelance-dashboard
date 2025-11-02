// src/components/ProjectList.tsx
import React, { useContext } from "react";
import { AppStateContext } from "../state";
import { Project } from "../models";

type Props = {
  projects: Project[];
  onSearch?: (q: string) => void;
};

export const ProjectList: React.FC<Props> = ({ projects }) => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("Must be used inside AppProvider");
  const { state, dispatch } = ctx;

  const markPaid = (projectId: string, amount: number) => {
    const payment = { projectId, amount, date: new Date().toISOString() };
    dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId, payment } });
  };

  return (
    <div>
      {projects.map(p => {
        const client = state.clients.find(c => c.id === p.clientId);
        // conditional styling
        const border = p.paymentStatus === "paid" ? "border-green-300" : "border-red-300";
        return (
          <div key={p.id} className={`p-3 mb-2 border ${border} rounded`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{p.title}</h4>
                <div className="text-sm text-gray-600">
                  {client ? client.name : <em>Client not found</em>} • {p.status}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">Budget: ${p.budget}</div>
                <div className="text-sm">Payment: {p.paymentStatus}</div>
                {p.paymentStatus === "unpaid" && (
                  <button
                    onClick={() => markPaid(p.id, p.budget)}
                    className="mt-2 px-3 py-1 rounded bg-blue-600 text-white text-sm"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
