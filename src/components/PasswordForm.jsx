import { useState, useEffect } from "react";
import generator from "generate-password";

export default function PasswordForm({ onAdd, defaults }) {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    if (defaults) {
      setForm({ site: defaults.site, username: defaults.username, password: defaults.password });
    }
  }, [defaults]);

  const generateStrongPassword = () => {
    const password = generator.generate({
      length: 16,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });
    setForm(f => ({ ...f, password }));
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.site || !form.username || !form.password) return;
    onAdd(form);
    if (!defaults) setForm({ site: "", username: "", password: "" }); // reset only on add
  };

  const strength = form.password.length > 12 ? "Strong" :
                   form.password.length > 8 ? "Medium" : "Weak";
  const strengthColor = strength === "Strong" ? "text-green-600" :
                        strength === "Medium" ? "text-yellow-600" : "text-red-600";

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        {defaults ? "Edit Password" : "Add New Password"}
      </h2>

      <div className="grid gap-4">
        <input name="site" value={form.site} onChange={handleChange} placeholder="Website (e.g. github.com)" required className="w-full border border-green-500 rounded-md px-4 py-3" />

        <input name="username" value={form.username} onChange={handleChange} placeholder="Username / Email" required className="w-full border border-green-500 rounded-md px-4 py-3" />

        <div className="flex gap-3">
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="text" required className="flex-1 border border-green-500 rounded-md px-4 py-3" />
          <button type="button" onClick={generateStrongPassword} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-medium">
            Generate
          </button>
        </div>

        {form.password && (
          <p className={`text-sm font-medium ${strengthColor}`}>
            Strength: {strength} ({form.password.length} chars)
          </p>
        )}

        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-md text-lg">
          {defaults ? "Save Changes" : "Add Password"}
        </button>
      </div>
    </form>
  );
}