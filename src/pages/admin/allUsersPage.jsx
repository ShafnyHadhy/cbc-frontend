import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";


function UserBlockConfirm(props){
    const email = props.email;
    const close = props.close;
    const refresh = props.refresh;

    function blockUser(){
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_API_URL + "/api/users/block/" + email, 
            {
                isBlock: !props.user.isBlock
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(
                (response) => {
                    console.log(response.data)
                    close();
                    toast.success("User blocked successfully!");
                    refresh();
                }
            ).catch(
                (error) => {
                    toast.error("Failed to block user",error)
                }
         )
    }
    

    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[500px] h-[200px] bg-primary rounded-2xl relative flex flex-col justify-center items-center gap-[40px] p-[30px]">
            <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                x
            </button>
            <p className="text-xl font-semibold">Are you sure you want to {props.user.isBlock} block this user with email : {email}?</p>

            <div className="flex gap-[40px]">
                <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-black rounded-[5px]">
                    No
                </button>
                <button onClick={blockUser} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-black rounded-[5px]">
                    Yes
                </button>
            </div> 
        </div>
    </div>
}

export default function AdminAllUsersPage(){

    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock,  setUserToBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect( ()=>{
        if(isLoading){
            const token = localStorage.getItem("token");
            if(token == null){
              toast.error("Please login to access the admin panel");
                navigate("/login");
                return
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
            (response)=>{
                console.log(response.data)
                setUsers(response.data)
                setIsLoading(false);
            })
        }
        
    }, [isLoading])

    return(
        <div className="h-full w-full p-6 bg-primary">
            {
                isBlockConfirmVisible && <UserBlockConfirm
                                            refresh={() => setIsLoading(true)}
                                            user={userToBlock}
                                            email={userToBlock.email}
                                            close={() => setIsBlockConfirmVisible(false)}
                                            />
            }

            {/* Table Container */}
            <div className="w-full min h-full">
                {isLoading?<Loader/>:
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-secondary text-white text-end">
                        <tr>
                            <th className="py-3 px-4 text-left rounded-tl-2xl">Image</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">First Name</th>
                            <th className="py-3 px-4 text-left">Last Name</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-center rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index)=>(
                                <tr 
                                  key={user.email} 
                                  className={`border-b last:border-none hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}
                                >
                                    <td className="py-3 px-4">
                                        <img src={user.image} 
                                            referrerPolicy="no-referrer" 
                                            alt={user.firstname} 
                                            className={"w-12 h-12 object-cover rounded-full shadow-sm border-2 p-1" + (user.isBlock? " border-red-600 " : " border-green-600")}/>
                                    </td>
                                    <td className="py-3 px-4 flex items-center gap-2">{user.email}{user.isEmailVarified&&<MdVerified color="blue"/> }</td>
                                    <td className="py-3 px-4 font-medium">{user.firstname}</td>
                                    <td className="py-3 px-4 font-medium">{user.lastname}</td>
                                    <td className="py-3 px-4 font-medium">
                                        {
                                            user.role === "admin" && <MdOutlineAdminPanelSettings className="inline text-lg mr-1"/>
                                        }
                                        {user.role}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-row gap-4 justify-center items-center text-lg">
                                            {
                                                <button onClick={()=>{
                                                    setUserToBlock(user);
                                                    setIsBlockConfirmVisible(true);
                                                }}
                                                className={"w-[100px] h-[30px] rounded-lg text-white " + (user.isBlock?"bg-green-600 hover:bg-green-800":"bg-red-600 hover:bg-red-800")}
                                                >{user.isBlock?"UnBlock":"Block"}</button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
