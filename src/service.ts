import axios from "axios";
import { Result } from "./types";

const BACKEND_URL = import.meta.env.BACKEND_URL || ""
if (!import.meta.env.BACKEND_URL) {
  console.warn("BACKEND_URL is not set, using mock data");
}

const nutripawtrol = axios.create({
  baseURL: BACKEND_URL
});

const service = {
  async get(search: string) {
    return nutripawtrol.get<Result[]>("/api/v1", {
      params: {
        query: search
      }
    });
  }
}

export default service;