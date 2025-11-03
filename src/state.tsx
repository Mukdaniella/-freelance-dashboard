// src/state.tsx
import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { Client, Project, Payment } from "./model";

// State shape
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// Discriminated union actions
export type Action =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string; payment: Payment } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } }
  | { type: "DELETE_PROJECT"; payload: { projectId: string } };

// initial example data
const initialState: AppState = {
  clients: [
    { id: "c1", name: "Amani Consulting", country: "Rwanda", email: "hello@amani.rw" },
    { id: "c2", name: "PixelPerfect Agency", country: "Uganda", email: "hello@pixelperfect.ug" },
    { id: "c3", name: "Kigali Design", country: "Kenya" } 
  ],
  projects: [
    { id: "p1", clientId: "c1", title: "Website for Amani", budget: 1500, status: "in-progress", paymentStatus: "unpaid" },
    { id: "p2", clientId: "c2", title: "Brand Kit", budget: 500, status: "completed", paymentStatus: "paid" },
    
  ],
  payments: [
    { projectId: "p2", amount: 500, date: new Date().toISOString() }
  ]
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };
    case "MARK_PROJECT_PAID": {
      const { projectId, payment } = action.payload;
      return {
        ...state,
        projects: state.projects.map(p => p.id === projectId ? { ...p, paymentStatus: "paid" } : p),
        payments: [...state.payments, payment]
      };
    }
    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.projectId ? { ...p, status: action.payload.status } : p)
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload.projectId),
        payments: state.payments.filter(pay => pay.projectId !== action.payload.projectId)
      };
    default:
      return state;
  }
}

export const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined >(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
};
