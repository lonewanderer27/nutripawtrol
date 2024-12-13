import axios from "axios";
import { LlmOutputType, LlmResultType, SuggestOutputNoCsvType, SuggestOutputType } from "./types";
import mockBackend from "./mockBackend";

// TODO: Set BACKEND_URL to the URL of the backend server 
// in .env for local development
// and in environment vars in production
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

// Start the mock backend
if (import.meta.env.MODE === 'development' && BACKEND_URL === "") {
  console.warn("BACKEND_URL is not set, using mock data");
  mockBackend();
}

const nutripawtrol = axios.create({
  baseURL: BACKEND_URL,
});

const service = {
  async llm(input: string) {
    return nutripawtrol.post<LlmResultType>("/llm", {
      input: input,
    });
  },
  async suggest(num: number, llmOutput: LlmOutputType[]) {
    return nutripawtrol.post<SuggestOutputType>("/suggest", {
      num: num,
      list: llmOutput,
    });
  },
  // Since noCsv only returns indexes of the products,
  // we've created a new service for it
  async suggestNoCsv(num: number, llmOutput: LlmOutputType[]) {
    return nutripawtrol.post<SuggestOutputNoCsvType>("/suggest", {
      num: num,
      list: llmOutput,
      "no-csv": true,
    });
  },
};

export default service;
