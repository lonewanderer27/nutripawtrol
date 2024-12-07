import axios from "axios";
import { Result } from "./types";

const Nutripawtrol = {
  async get (search: string) {
    return axios.get<Result[]>("/api/v1", {
      params: {
        query: search
      }
    });
  }
}

export default Nutripawtrol;