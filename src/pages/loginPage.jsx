import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login(){
        try{
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login", 
                { email: email, password: password }
            );
            //save details from token on a local storage
            localStorage.setItem("token", response.data.token);
            toast.success("Login successfull!")

            const user = response.data.user;
            if(user.role == 'admin'){
                navigate("/admin")
            }else{
                navigate("/")
            }
        }catch(e){
            console.error("Login failed:", e);
            toast.error("Login failed, check your credintials")
        }
        
    }

    return(
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[500px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-[10px]">

                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    } className="w-[400px] h-[40px] bg-white"/>

                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } className="w-[400px] h-[40px] bg-white"/>

                    <button onClick={login} className="w-[400px] h-[40px] bg-accent">
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}