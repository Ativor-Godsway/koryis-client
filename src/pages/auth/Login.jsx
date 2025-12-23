import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { useState } from "react";

const Login = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear old error

    try {
      const res = await login({ code, password });

      // Redirect based on user type
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else if (res.role === "parent") {
        navigate("/parent/dashboard");
      } else if (res.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (res.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200"
    >
      <div
        className="w-full md:w-[480px] bg-white rounded-3xl p-8
                  shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
      >
        <h2 className="text-3xl font-semibold text-center mb-2 text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Log in to continue
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User ID
            </label>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                     focus:border-indigo-500 transition"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50
                     border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                     focus:border-indigo-500 transition"
              />

              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                     text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium
                   hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {error && (
          <p className="mt-4 text-red-600 font-medium bg-red-100 py-3 px-2 rounded-lg text-center">
            {String(error)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
