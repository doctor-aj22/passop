// src/lib/api.js
import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const getUserId = () => auth.currentUser?.uid || "";

export const listPasswords = async () => {
  const res = await fetch(`${API_URL}/api?userId=${getUserId()}`);
  return res.json();
};

export const createPassword = async (data) => {
  const res = await fetch(`${API_URL}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: getUserId() }),
  });
  return res.json();
};

export const updatePassword = async (id, data) => {
  const res = await fetch(`${API_URL}/api/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: getUserId() }),
  });
  return res.json();
};

export const deletePassword = async (id) => {
  await fetch(`${API_URL}/api/${id}?userId=${getUserId()}`, { method: "DELETE" });
};