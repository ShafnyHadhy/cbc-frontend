import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios.post(import.meta.env.VITE_API_URL + "/api/users/google-login", { 
        token: response.access_token 
      }).then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Google login successful!");
        const user = res.data.user;
        if (user.role === "admin") {
          navigate("/admin");
        }else {
          navigate("/");
        }
      }).catch((e) => {
        console.error("Google login failed:", e);
        toast.error("Google login failed");
      })
    },
  });

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        { email: email, password: password }
      );

      localStorage.setItem("token", response.data.token);
      
      toast.success("Login successful!");

      const user = response.data.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed, check your credentials");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="flex w-[90%] max-w-6xl h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg">
        
        {/* Left Section */}
        <div className="w-1/2 hidden md:flex flex-col justify-center items-center p-10 bg-accent">
          <img
            src="/cbclogo.png"
            alt="Crystal Beauty Cosmetics Logo"
            className="w-40 mb-6"
          />
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Crystal Beauty Cosmetics
          </h1>
          <p className="text-white/80 mt-4 text-center text-lg">
            Discover elegance and beauty with every click.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center backdrop-blur-lg shadow-2xl">
          <div className="w-[400px] p-8 rounded-2xl shadow-xl bg-white">
            <h2 className="text-2xl font-semibold text-secondary text-center mb-6">
              Welcome Back ✨
            </h2>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 mb-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 mb-6 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* Login Button */}
            <button
              onClick={login}
              className="w-full h-12 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#e36f1d] transition mb-2"
            >
              Log In
            </button>
            <button
              onClick={googleLogin}
              className="w-full h-12 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#e36f1d] transition"
            >
              Google Log In
            </button>

            {/* Extra Links */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
