import { useEffect, useState, useMemo } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
import { listPasswords, createPassword, updatePassword, deletePassword } from "../lib/api";

export default function Home() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");  // ← NEW

  useEffect(() => {
    listPasswords().then(setItems);
  }, []);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.site.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const addPassword = async (data) => {
    if (editing) {
      const updated = await updatePassword(editing._id, data);
      setItems(prev => prev.map(p => p._id === editing._id ? updated : p));
      setEditing(null);
    } else {
      const created = await createPassword(data);
      setItems(prev => [...prev, created]);
    }
  };

  const deletePasswordHandler = async (id) => {
    if (confirm("Delete this password?")) {
      await deletePassword(id);
      setItems(prev => prev.filter(p => p._id !== id));
    }
  };

  const copyToClipboard = async (pass) => {
    await navigator.clipboard.writeText(pass);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-slate-900">
          <span className="text-green-700">&lt;</span>Pass<span className="text-green-700">OP</span><span className="text-green-700">/&gt;</span>
        </h1>
        <p className="text-center text-slate-700 mb-8">Your secure password manager</p>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search by site or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:border-green-600 text-lg"
          />
        </div>

        <div className="mt-8">
          <PasswordForm onAdd={addPassword} defaults={editing || null} />
        </div>

        <PasswordList
          items={filteredItems}
          onCopy={copyToClipboard}
          onEdit={setEditing}
          onDelete={deletePasswordHandler}
        />
      </div>
    </div>
  );
}