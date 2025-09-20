import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModel";


export default function AdminOrdersPage(){

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null)

    const navigate = useNavigate();

    useEffect( ()=>{
        if(isLoading){

            const token = localStorage.getItem("token");
            if(token == null){
                navigate("/login");
                return;
            }

            axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(
                (response)=>{
                    console.log(response.data)
                    setOrders(response.data.orders)
                    setIsLoading(false);
                }
            )
        }
        
    }, [isLoading])

    return(
        <div className="h-full w-full p-6 bg-primary">

            <OrderModal isModelOpen={isModelOpen} closeModel={()=> setIsModelOpen(false)} selectedOrder={selectedOrder} refresh={()=> {setIsLoading(true)}} />

            {/* Table Container */}
            <div className="w-full min h-full">
                {isLoading?<Loader/>:
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-secondary text-white text-end">
                        <tr>
                            <th className="py-3 px-4 text-left rounded-tl-2xl">Order ID</th>
                            <th className="py-3 px-4 text-left">No Items</th>
                            <th className="py-3 px-4 text-left">Customer Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th className="py-3 px-4 text-left">Address</th>
                            <th className="py-3 px-4 text-left">Total</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr
                                key={item.orderID}
                                className={`border-b last:border-none hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}
                                onClick={()=>{
                                    setSelectedOrder(item)
                                    setIsModelOpen(true)
                                }}
                            >
                                <td className="py-3 px-4">{item.orderID}</td>
                                <td className="py-3 px-4">{item.items.length} item</td>
                                <td className="py-3 px-4">{item.customerName}</td>
                                <td className="py-3 px-4">{item.email}</td>
                                <td className="py-3 px-4">{item.phone}</td>
                                <td className="py-3 px-4">{item.address}</td>
                                <td className="py-3 px-4">{`LKR ${item.total.toFixed(2)}`}</td>
                                <td className="py-3 px-4">{item.status}</td>
                                <td className="py-3 px-4">{new Date(item.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
