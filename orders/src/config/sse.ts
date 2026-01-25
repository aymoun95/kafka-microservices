import { Response } from "express";

interface Client {
  id: string;
  res: Response;
}

let clients: Client[] = [];

export const addClient = (id: string, res: Response) => {
  clients.push({ id, res });
  console.log(`SSE: Client ${id} connected. Total: ${clients.length}`);
};

export const removeClient = (id: string) => {
  clients = clients.filter((c) => c.id !== id);
  console.log(`SSE: Client ${id} disconnected. Total: ${clients.length}`);
};

export const broadcast = (data: any) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((client) => client.res.write(payload));
};
