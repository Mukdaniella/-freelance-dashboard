// src/App.tsx
import React, { useContext, useState } from "react";
import { AppProvider, AppStateContext } from "./state";
import { ClientCard } from "./components/ClientCard";
import { ProjectList } from "./components/ProjectList";
import { DashboardStats } from "./components/DashboardStats";

const DashboardInner = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) return null;
  const { state } = ctx;
  const [q, setQ] = useState("");

  const filteredProjects = state.projects.filter(p => {
    if (!q) return true;
    return p.title.toLowerCase().includes(q.toLowerCase()) || (state.clients.find(c => c.id === p.clientId)?.name || "").toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl mb-4">Freelance Dashboard</h1>
      <div className="mb-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects or clients..." className="p-2 border rounded w-full" />
      </div>

      <DashboardStats projects={filteredProjects} />

      <section className="mt-6">
        <h2 className="text-xl mb-2">Clients</h2>
        <div className="grid grid-cols-2 gap-4">
          {state.clients.map(c => <ClientCard key={c.id} client={c} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl mb-2">Projects</h2>
        <ProjectList projects={filteredProjects} />
      </section>

      <section className="mt-6">
        <h2>Payments</h2>
        <ul>
          {state.payments.map((pay, i) => (
            <li key={i}>{pay.projectId} — ${pay.amount} — {new Date(pay.date).toLocaleString()}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export const App = () => (
  <AppProvider>
    <DashboardInner />
  </AppProvider>
);
