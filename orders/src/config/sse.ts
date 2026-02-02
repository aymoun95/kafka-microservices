import { Response } from "express";

interface Client {
  userId: string;
  res: Response;
}

let clients: Client[] = [];

export const addClient = (userId: string, res: Response) => {
  clients.push({ userId, res });
  console.log(
    `SSE: User ${userId} connected. Total clients: ${clients.length}`,
  );
};

export const removeClient = (userId: string, res: Response) => {
  clients = clients.filter((c) => c.res !== res);
  console.log(
    `SSE: User ${userId} disconnected. Total clients: ${clients.length}`,
  );
};

export const sendToUser = (userId: string, data: any) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;

  clients
    .filter((client) => client.userId === userId)
    .forEach((client) => client.res.write(payload));
};
