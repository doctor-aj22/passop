// src/components/PasswordForm.jsx  ←←← REPLACE THIS FILE

import { useState, useEffect } from "react";
import generator from "generate-password";
import { X } from "lucide-react";
import { encryptPassword, decryptPassword, generateKey } from "../lib/encrypt";

export default function PasswordForm({ defaults, onSave, onClose, user }) {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    if (defaults) {
      const masterPass = prompt("Enter your account password to edit:");
      if (!masterPass) {
        onClose();
        return;
      }

      const key = generateKey(user.email, masterPass);
      const decrypted = decryptPassword(defaults.password, key);

      if (!decrypted) {
        alert("Wrong password!");
        onClose();
        return;
      }

      setForm({
        site: defaults.site,
        username: defaults.username || "",
        password: decrypted
      });
    }
  }, [defaults, user.email, onClose]);

  const generate = () => {
    const pass = generator.generate({
      length: 18,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });
    setForm({ ...form, password: pass });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.site || !form.password) return alert("Fill site and password");

    const masterPass = prompt("Re-enter your account password to save:");
    if (!masterPass) return;

    const key = generateKey(user.email, masterPass);
    const encrypted = encryptPassword(form.password, key);

    onSave({
      site: form.site,
      username: form.username,
      password: encrypted,
      id: defaults?.id
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{defaults ? "Edit Password" : "Add New Password"}</h2>
        <button type="button" onClick={onClose}><X className="w-6 h-6" /></button>
      </div>

      <input placeholder="Website" value={form.site} onChange={e => setForm({ ...form, site: e.target.value })} required className="w-full px-4 py-3 rounded-lg border" />
      <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-3 rounded-lg border" />
      
      <div className="flex gap-3">
        <input placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required className="flex-1 px-4 py-3 rounded-lg border" />
        <button type="button" onClick={generate} className="px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold">
          Generate
        </button>
      </div>

      <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">
        {defaults ? "Update Encrypted" : "Save Encrypted"}
      </button>
    </form>
  );
}