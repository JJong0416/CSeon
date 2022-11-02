import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7070/api",
  // baseURL: "https://k7a606.p.ssafy.io:7070/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const createHeaders = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export { instance, createHeaders };
