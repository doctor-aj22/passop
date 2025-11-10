import { useEffect, useState, useMemo } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
import { loadPasswords, addPassword as addLocal, deletePassword as delLocal, updatePassword as updLocal } from "../lib/storage";

export default function Home() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setItems(loadPasswords());
  }, []);

  const addPassword = (data) => {
    if (editing) {
      const updated = updLocal(editing.id, data);
      setItems(prev => prev.map(p => p.id === editing.id ? updated : p));
      setEditing(null);
    } else {
      const created = addLocal(data);
      setItems(prev => [...prev, created]);
    }
  };

  const deletePassword = (id) => {
    if (confirm("Do you really want to delete?")) {
      delLocal(id);
      setItems(prev => prev.filter(p => p.id !== id));
    }
  };

  const copyToClipboard = async (value) => {
    await navigator.clipboard.writeText(value);
    alert("Password copied!");
  };

  const formDefaults = useMemo(() => editing ? { ...editing } : null, [editing]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-slate-900">
          <span className="text-green-700">&lt;</span>Pass<span className="text-green-700">OP</span><span className="text-green-700">/&gt;</span>
        </h1>
        <p className="text-center text-slate-700">Your own password manager</p>
        <div className="mt-6">
          <PasswordForm onAdd={addPassword} defaults={formDefaults} />
        </div>
        <PasswordList items={items} onCopy={copyToClipboard} onEdit={setEditing} onDelete={deletePassword} />
      </div>
    </div>
  );
}