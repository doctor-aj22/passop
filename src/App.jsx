// src/App.jsx
import { useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Auth onLogin={(userData) => setUser(userData)} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}