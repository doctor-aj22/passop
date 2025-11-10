export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <span className="text-white">&lt;</span>
          <span className="text-green-300">Pass</span>
          <span className="text-white">OP</span>
          <span className="text-white">/&gt;</span>
        </div>
        <ul className="flex gap-6">
          <li className="hover:font-bold cursor-pointer">Home</li>
          <li className="hover:font-bold cursor-pointer">About</li>
          <li className="hover:font-bold cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
}