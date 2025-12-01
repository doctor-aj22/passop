import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill email and password");
      return;
    }

    // Simple login logic (add your backend call here)
    onLogin({ email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative w-full max-w-4xl h-96 overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* LOGIN PANEL — 3D SLIDE LEFT */}
        <motion.div
          animate={{ x: isLogin ? 0 : "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex"
        >
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center shadow-lg">
            <h2 className="text-4xl font-bold mb-8">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-purple-300 shadow-md"
              />
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-5 py-4 pr-12 rounded-xl border border-gray-300 focus:ring-4 focus:ring-purple-300 shadow-md"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-5">
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-lg shadow-xl"
              >
                SIGN IN
              </motion.button>
            </form>
          </div>

          <div className="w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-12 flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-8 opacity-90">Register to unlock all features</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsLogin(false)}
              className="px-12 py-4 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-purple-600 transition"
            >
              SIGN UP
            </motion.button>
          </div>
        </motion.div>

        {/* SIGN UP PANEL — 3D SLIDE RIGHT */}
        <motion.div
          animate={{ x: isLogin ? "100%" : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex"
        >
          <div className="w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-12 flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-8">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-4 focus:ring-white/50"
              />
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-5 py-4 pr-12 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-4 focus:ring-white/50"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-5 text-white">
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-300 text-center">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-white text-purple-600 font-bold rounded-xl text-lg shadow-xl"
              >
                SIGN UP
              </motion.button>
            </form>
          </div>
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="mb-8 text-gray-600">Login with your personal info</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsLogin(true)}
              className="px-12 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition"
            >
              SIGN IN
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}