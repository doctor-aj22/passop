// src/pages/Dashboard.jsx  ←←← REPLACE THIS ENTIRE FILE

import { useState, useEffect } from "react";
import { LogOut, Plus } from "lucide-react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

export default function Dashboard({ user, onLogout }) {
  const [passwords, setPasswords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Load passwords for this user
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("all_passwords") || "{}");
    setPasswords(all[user.email] || []);
  }, [user.email]);

  const savePassword = (data) => {
    const all = JSON.parse(localStorage.getItem("all_passwords") || "{}");
    if (!all[user.email]) all[user.email] = [];

    if (editing) {
      all[user.email] = all[user.email].map(p => p.id === editing.id ? { ...p, ...data } : p);
    } else {
      all[user.email].push({ ...data, id: Date.now() });
    }

    localStorage.setItem("all_passwords", JSON.stringify(all));
    setPasswords(all[user.email]);
    setEditing(null);
    setShowForm(false);
  };

  const deletePassword = (id) => {
    const all = JSON.parse(localStorage.getItem("all_passwords") || "{}");
    all[user.email] = all[user.email].filter(p => p.id !== id);
    localStorage.setItem("all_passwords", JSON.stringify(all));
    setPasswords(all[user.email]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PassOP
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium transition"
          >
            <LogOut size={22} />
            Logout ({user.email})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Your Secure Vault</h2>
            <p className="text-gray-600 mt-2">{passwords.length} passwords encrypted</p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl flex items-center gap-3 transform hover:scale-105 transition"
          >
            <Plus size={24} />
            Add Password
          </button>
        </div>

        {/* Password List */}
        <PasswordList
          items={passwords}
          onEdit={(item) => {
            setEditing(item);
            setShowForm(true);
          }}
          onDelete={deletePassword}
          user={user}   // ←←← THIS WAS MISSING!
        />

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-10 w-full max-w-2xl shadow-3xl">
              <PasswordForm
                defaults={editing}
                onSave={savePassword}
                onClose={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                user={user}   // ←←← THIS WAS MISSING!
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}