// src/utils.ts
import { AppState, Client, Project, Payment } from "./model";

// Count paid vs unpaid projects
export function countPaidUnpaid(projects: Project[]): { paid: number; unpaid: number } {
  let paid = 0, unpaid = 0;
  projects.forEach(p => p.paymentStatus === "paid" ? (paid++) : (unpaid++));
  return { paid, unpaid };
}

// Find client by ID safely
export function findClientById(state: { clients: Client[] }, id: string): Client | undefined {
  return state.clients.find(c => c.id === id);
}

// Record a new payment with validation
export function recordPayment(
  state: AppState,
  projectId: string,
  amount: number
): { success: boolean; payment?: Payment; error?: string } {
  const project = state.projects.find((p: Project) => p.id === projectId);
  if (!project) return { success: false, error: "Project not found" };
  if (amount <= 0) return { success: false, error: "Amount must be > 0" };
  const payment: Payment = { projectId, amount, date: new Date().toISOString() };
  return { success: true, payment };
}

// Filter projects by status or payment state
export function filterProjects(projects: Project[], opts: { status?: Project["status"]; paymentStatus?: Project["paymentStatus"] }) {
  return projects.filter(p => {
    if (opts.status && p.status !== opts.status) return false;
    if (opts.paymentStatus && p.paymentStatus !== opts.paymentStatus) return false;
    return true;
  });
}

// Search clients or projects by name
export function searchByName<T extends { name?: string; title?: string }>(items: T[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return items;
  return items.filter(it => ((it as any).name || (it as any).title || "").toLowerCase().includes(s));
}
