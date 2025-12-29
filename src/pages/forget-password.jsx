import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOTP() {
        try{
            await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email);
            toast.success("Reset code sent to your email. " + email);
            setStep("otp");
        } catch(e){
            toast.error("Failed to send reset code, please try again.");
        }
    }

    async function changePassword() {

        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        try{
            axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password changed successfully.");
            navigate("/login");
        } catch(e){
            toast.error("OTP is incorrect or expired, please try again.");
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
            {step=="email" && <div className="w-[400px] h-[400px] backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10">
                <h1 className="text-2xl font-semibold text-secondary mb-6">Reset Password</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent-dark transition" onClick={sendOTP}>Send Reset Code</button>
            </div>}

            {step=="otp" && <div className="w-[400px] backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10">
                <h1 className="text-2xl font-semibold text-secondary mb-6">Enter Reset Code</h1>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the code sent to your email" className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent-dark transition" onClick={changePassword}>Change Password</button>
            </div>}
        </div>
    )
}