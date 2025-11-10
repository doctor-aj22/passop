export const STORAGE_KEY = "passop-passwords";

export function loadPasswords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function savePasswords(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addPassword(item) {
  const list = loadPasswords();
  const withId = { ...item, id: crypto.randomUUID(), createdAt: Date.now() };
  list.push(withId);
  savePasswords(list);
  return withId;
}

export function updatePassword(id, updates) {
  const list = loadPasswords();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates, updatedAt: Date.now() };
  savePasswords(list);
  return list[idx];
}

export function deletePassword(id) {
  const list = loadPasswords();
  const next = list.filter(p => p.id !== id);
  savePasswords(next);
  return true;
}