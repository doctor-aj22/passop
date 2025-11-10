export default function PasswordList({ items, onCopy, onEdit, onDelete }) {
  if (!items.length) return <p className="text-slate-700">No passwords to show.</p>;

  return (
    <div className="mt-4 bg-white/70 backdrop-blur rounded-xl p-4 shadow">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-600">
            <th className="py-2">Site</th>
            <th className="py-2">Username</th>
            <th className="py-2">Password</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="border-t border-slate-200">
              <td className="py-2">{p.site}</td>
              <td className="py-2">{p.username}</td>
              <td className="py-2">
                <span className="select-none">- - - - - - - - </span>
              </td>
              <td className="py-2">
                <div className="flex gap-2">
                  <button onClick={() => onCopy(p.password)} className="px-2 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded">Copy</button>
                  <button onClick={() => onEdit(p)} className="px-2 py-1 text-sm bg-amber-100 hover:bg-amber-200 rounded">Edit</button>
                  <button onClick={() => onDelete(p.id)} className="px-2 py-1 text-sm bg-rose-100 hover:bg-rose-200 rounded">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}