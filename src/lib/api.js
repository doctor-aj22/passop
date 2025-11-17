const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function listPasswords() {
  const r = await fetch(`${API}/api/passwords`);
  return r.json();
}

export async function createPassword(data) {
  const r = await fetch(`${API}/api/passwords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function updatePassword(id, data) {
  const r = await fetch(`${API}/api/passwords/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function deletePassword(id) {
  const r = await fetch(`${API}/api/passwords/${id}`, { method: "DELETE" });
  return r.json();
}