import axios from "axios";

export const httpService = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
