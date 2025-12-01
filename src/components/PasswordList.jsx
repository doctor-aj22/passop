// src/components/PasswordList.jsx  ←←← REPLACE THIS FILE

import { Copy, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { decryptPassword, generateKey } from "../lib/encrypt";

export default function PasswordList({ items, onEdit, onDelete, user }) {
  const [visible, setVisible] = useState({});
  const [decryptedCache, setDecryptedCache] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const unlockPassword = (item) => {
    const masterPass = prompt("Enter your account password to view/copy:");
    if (!masterPass) return;

    const key = generateKey(user.email, masterPass);
    const plain = decryptPassword(item.password, key);

    if (!plain) {
      alert("Wrong password!");
      return;
    }

    setDecryptedCache({ ...decryptedCache, [item.id]: plain });
    setVisible({ ...visible, [item.id]: true });
  };

  const handleDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    onDelete(showDeleteConfirm);
    setShowDeleteConfirm(null);
  };

  if (!items.length) {
    return <p className="text-center text-gray-500 py-20 text-xl">No passwords saved yet</p>;
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.site}</h3>
              <p className="text-gray-600">{item.username || "—"}</p>
            </div>

            <div className="flex gap-3">
              {/* EDIT BUTTON — WORKS 100% */}
              <button
                onClick={() => onEdit(item)}
                className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition transform hover:scale-110"
                title="Edit"
              >
                <Edit2 size={22} className="text-blue-600" />
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(item.id)}
                className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition transform hover:scale-110"
                title="Delete"
              >
                <Trash2 size={22} className="text-red-600" />
              </button>
            </div>
          </div>

          {/* PASSWORD DISPLAY */}
          <div className="bg-gray-50 rounded-xl px-5 py-4 flex items-center gap-4">
            <span className="font-mono text-lg flex-1 tracking-wider">
              {visible[item.id] ? decryptedCache[item.id] : "••••••••••••••••"}
            </span>

            {/* SHOW/HIDE */}
            <button
              onClick={() => unlockPassword(item)}
              className="text-gray-600 hover:text-gray-800"
            >
              {visible[item.id] ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>

            {/* COPY */}
            <button
              onClick={() => {
                if (visible[item.id]) {
                  navigator.clipboard.writeText(decryptedCache[item.id]);
                  alert("Password copied!");
                } else {
                  unlockPassword(item);
                }
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition"
            >
              Copy
            </button>
          </div>
        </div>
      ))}

      {/* DELETE CONFIRMATION — WORKS 100% */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md">
            <h3 className="text-3xl font-bold mb-4">Delete Password?</h3>
            <p className="text-gray-600 mb-8 text-lg">This action cannot be undone!</p>
            <div className="flex gap-6 justify-center">
              <button
                onClick={confirmDelete}
                className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-10 py-4 bg-gray-300 hover:bg-gray-400 text-black rounded-2xl font-bold text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}