// src/App.tsx
import React, { useContext, useState } from "react";
import { AppProvider, AppStateContext } from "./state";
import { ClientCard } from "./components/clientcard";
import { ProjectList } from "./components/projectlist";
import { DashboardStats } from "./components/dashboardstatus";
import { Search, Menu } from "lucide-react";

type View = "dashboard" | "clients" | "projects";

const DashboardInner = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) return null;
  const { state } = ctx;

  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredClients = state.clients.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );

  const filteredProjects = state.projects.filter((p) => {
    if (!q) return true;
    const clientName =
      state.clients.find((c) => c.id === p.clientId)?.name || "";
    return (
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      clientName.toLowerCase().includes(q.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col lg:flex-row">
      {/* Mobile Header / Menu button */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-indigo-400">Freelance Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 p-6 border-r border-slate-700 bg-slate-900 transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="hidden lg:block text-2xl font-bold mb-8 text-center text-indigo-400">
              Freelance Dashboard
            </h1>
            <nav className="space-y-4">
              <button
                onClick={() => {
                  setView("dashboard");
                  setSidebarOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 rounded-md transition ${
                  view === "dashboard" ? "bg-slate-700" : "hover:bg-slate-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setView("clients");
                  setSidebarOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 rounded-md transition ${
                  view === "clients" ? "bg-slate-700" : "hover:bg-slate-700"
                }`}
              >
                Clients
              </button>
              <button
                onClick={() => {
                  setView("projects");
                  setSidebarOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 rounded-md transition ${
                  view === "projects" ? "bg-slate-700" : "hover:bg-slate-700"
                }`}
              >
                Projects
              </button>
            </nav>
          </div>
          <div className="text-xs text-gray-400 text-center mt-6">
            © {new Date().getFullYear()} Freelance Tracker
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto ">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide capitalize">
            {view === "dashboard"
              ? "Dashboard Overview"
              : view === "clients"
              ? "Clients"
              : "Projects"}
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
                view === "dashboard"
                  ? "Search projects or clients..."
                  : view === "clients"
                  ? "Search clients..."
                  : "Search projects..."
              }
              className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </header>

        {/* Dashboard Stats */}
        {view === "dashboard" && (
          <DashboardStats projects={filteredProjects} />
        )}

        {/* Clients Section */}
        {(view === "dashboard" || view === "clients") && (
          <section className={`${view === "dashboard" ? "mt-6" : ""}`}>
            <h3 className="text-2xl font-medium mb-4 border-b border-slate-700 pb-2">
              Clients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((c) => (
                <ClientCard key={c.id} client={c} />
              ))}
              {filteredClients.length === 0 && (
                <p className="text-gray-400 col-span-full text-center">
                  No clients found.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {(view === "dashboard" || view === "projects") && (
          <section className={`${view === "dashboard" ? "mt-6" : ""}`}>
            <h3 className="text-2xl font-medium mb-4 border-b border-slate-700 pb-2">
              Projects
            </h3>
            {filteredProjects.length > 0 ? (
              <ProjectList projects={filteredProjects} />
            ) : (
              <p className="text-gray-400">No projects found.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export const App = () => (
  <AppProvider>
    <DashboardInner />
  </AppProvider>
);
