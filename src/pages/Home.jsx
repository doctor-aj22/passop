import { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
import { listPasswords, createPassword, updatePassword, deletePassword } from "../lib/api";
import { Search, Plus, Download } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Home({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    listPasswords().then(setItems);
  }, []);

  const categories = ["All", "Personal", "Work", "Banking", "Social", "Others"];

  const filtered = items
    .filter(item => selectedCategory === "All" || item.category === selectedCategory)
    .filter(item => 
      item.site.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
    );

  const handleSave = async (data) => {
    if (editing) {
      const updated = await updatePassword(editing._id, data);
      setItems(prev => prev.map(p => p._id === editing._id ? updated : p));
      toast.success("Updated!");
    } else {
      const created = await createPassword(data);
      setItems(prev => [...prev, created]);
      toast.success("Saved!");
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">My Vault</h1>
          <p className="text-gray-300">{filtered.length} passwords</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-epic-purple hover:bg-purple-700 text-white rounded-xl flex items-center gap-2">
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search passwords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-epic-purple"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-epic-purple text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <PasswordList items={filtered} onEdit={setEditing} onDelete={deletePassword} onSave={() => setShowForm(true)} />

      {showForm && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">
            <PasswordForm defaults={editing} onSave={handleSave} onClose={() => setShowForm(false)} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}