import { useState, useEffect } from "react";

export default function PasswordForm({ onAdd, defaults }) {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    if (defaults) {
      setForm({ site: defaults.site, username: defaults.username, password: defaults.password });
    }
  }, [defaults]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.site || !form.username || !form.password) return;
    onAdd(form);
    setForm({ site: "", username: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur rounded-xl p-4 shadow flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-slate-900">Add Password</h2>
      <input name="site" value={form.site} onChange={handleChange} placeholder="Website (e.g., example.com)" className="w-full border border-green-500 rounded-md px-3 py-2 text-black" />
      <div className="flex gap-3">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-1/2 border border-green-500 rounded-md px-3 py-2 text-black" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-1/2 border border-green-500 rounded-md px-3 py-2 text-black" />
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 self-start">{defaults ? "Save changes" : "Add password"}</button>
    </form>
  );
}