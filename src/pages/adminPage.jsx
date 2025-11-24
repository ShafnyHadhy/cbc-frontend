import { BsCart2, BsGraphUpArrow } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddNewProduct from "./admin/adminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <BsGraphUpArrow /> },
    { path: "/admin/orders", label: "Orders", icon: <BsCart2 /> },
    { path: "/admin/products", label: "Products", icon: <FiBox /> },
    { path: "/admin/users", label: "Users", icon: <HiOutlineUsers /> },
  ];

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(
    ()=> {
      const token = localStorage.getItem("token");
      if(token == null){
        toast.error("Please login to access the admin panel");
        navigate("/login");
        return 
      }

      axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then((res) => {
        if(res.data.role !== "admin"){
          toast.error("You are not authorized to access admin panel")
          navigate("/")
          return;
        }
        setUserLoaded(true);
      }).catch(() => {
        toast.error("Session expired please login again!");
        localStorage.removeItem("token");
        navigate("/login")
      });
      
    }, []
  )

  return (
    <div className="w-full h-full bg-primary flex p-2">
      {/* Sidebar */}
      <div className="w-[280px] h-full bg-white shadow-lg rounded-2xl flex flex-col items-center py-6">
        {/* Logo */}
        <div className="flex flex-row items-center w-[85%] h-[80px] bg-accent rounded-xl mb-10 px-4 shadow-md">
          <img src="/cbclogo.png" alt="cbc logo" className="h-[60px] rounded-lg" />
          <span className="text-white text-lg font-semibold ml-3">Admin Panel</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3 w-[85%]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 
              ${location.pathname === item.path 
                ? "bg-accent text-white shadow-md scale-[1.02]" 
                : "hover:bg-gray-100 hover:scale-[1.01]"}`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="w-[calc(100%-280px)] h-full border-[4px] border-accent rounded-[15px] overflow-hidden bg-white shadow-xl">
        <div className="w-full h-full max-w-full max-h-full overflow-y-scroll">
          {userLoaded?<Routes path="/">
            <Route path="/" element={<h1 className="p-6 text-2xl font-bold">Dashboard</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage/>} />
            <Route path="/users" element={<h1 className="p-6 text-2xl font-bold">Users</h1>} />
            <Route path="/add-product" element={<AdminAddNewProduct />} />
            <Route path="/update-product" element={<AdminUpdateProduct/>} />
          </Routes>:<Loader/>}
        </div>
      </div>
    </div>
  );
}
