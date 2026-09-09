import axios from "axios";

// Backend API URL
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// MEDICINES
// ===============================

export const getMedicines = async () => {
  const response = await api.get("/medicines");
  return response.data;
};

export const addMedicine = async (medicine) => {
  const response = await api.post("/medicines", medicine);
  return response.data;
};

export const updateMedicine = async (id, medicine) => {
  const response = await api.put(`/medicines/${id}`, medicine);
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await api.delete(`/medicines/${id}`);
  return response.data;
};

// ===============================
// DASHBOARD
// ===============================

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export default api;