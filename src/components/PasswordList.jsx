import { useState } from "react";

export default function PasswordList({ items, onCopy, onEdit, onDelete }) {
  const [visiblePasswords, setVisiblePasswords] = useState(new Set());

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  if (!items || items.length === 0) {
    return <p className="text-slate-700 text-center mt-8">No passwords saved yet.</p>;
  }

  return (
    <div className="mt-8 bg-white/70 backdrop-blur rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Saved Passwords</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-green-600 text-slate-700">
              <th className="py-3">Site</th>
              <th className="py-3">Username</th>
              <th className="py-3">Password</th>
              <th className="py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const id = p._id || p.id; // Works with both LocalStorage and MongoDB
              const isVisible = visiblePasswords.has(id);

              return (
                <tr key={id} className="border-b hover:bg-slate-50">
                  <td className="py-4 font-medium">{p.site}</td>
                  <td className="py-4">{p.username}</td>
                  <td className="py-4 font-mono text-sm">
                    {isVisible ? p.password : "••••••••••••"}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => toggleVisibility(id)}
                        className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                      >
                        {isVisible ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() => onCopy(p.password)}
                        className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => onEdit(p)}
                        className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="px-3 py-1 text-xs bg-rose-100 hover:bg-rose-200 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}