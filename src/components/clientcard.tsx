// src/components/ClientCard.tsx
import React from "react";
import { Client } from "../models";

type Props = {
  client: Client;
};

export const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="p-3 border rounded shadow-sm">
      <h3 className="font-semibold">{client.name}</h3>
      <p className="text-sm">{client.country}</p>
      <p className="text-xs text-gray-600">{client.email ?? "No email provided"}</p>
    </div>
  );
};
