import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  async function register() {

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/",
        { 
            email: email, 
            password: password,
            firstname: firstName,
            lastname: lastName
        }
      );
        console.log("Registration successful:", response.data);
        toast.success("Registration successful!");
        navigate("/login");

    } catch (e) {
      console.error("Registration failed:", e);
      toast.error("Registration failed, check your credentials");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="flex w-[90%] max-w-6xl h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center backdrop-blur-lg shadow-2xl">
          <div className="w-[400px] p-8 rounded-2xl shadow-xl bg-white">
            <h2 className="text-2xl font-semibold text-secondary text-center mb-6">
              Welcome ✨
            </h2>

            {/* Email Input */}
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 mb-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* fistname Input */}
            <input
              type="text"
              autoComplete="given-name"
              placeholder="Enter your firstname"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-12 px-4 mb-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* lastname Input */}
            <input
              type="text"
              autoComplete="family-name"
              placeholder="Enter your lastname"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-12 px-4 mb-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* Password Input */}
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 mb-6 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 px-4 mb-6 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition"
            />

            {/* Login Button */}
            <button
              onClick={register}
              className="w-full h-12 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#e36f1d] transition"
            >
              Register
            </button>

            {/* Extra Links */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-medium hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
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
      </div>
    </div>
  );
}
