import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export type Health = {
  status: string;
  database: "ok" | "error";
  uptime: number;
  timestamp: string;
};

export const healthApi = {
  get: () => api.get<Health>("/health").then((r) => r.data),
};
