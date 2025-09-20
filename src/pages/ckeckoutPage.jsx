import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage(){

    const location = useLocation()
    const navigate = useNavigate()

    const [cart, setCart] = useState(location.state);

    function getTotal(){
        let total = 0;
        cart.forEach(
            (item)=>{
                total += item.price * item.quantity
            }
        )
        return total;
    }

    async function purchaseCart(){
        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("Please login to place an order!!!");
            navigate("/login")
            return;
        }

        try{
            const items = []

            for(let i = 0; i<cart.length; i++){
                items.push(
                    {
                        productID: cart[i].productID,
                        quantity: cart[i].quantity
                    }
                )
            }

            await axios.post(import.meta.env.VITE_API_URL + "/api/orders",{
                address: "No 123, Main street, City",
                items: items
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success("Order placed successfully");

        }catch(error){
            toast.error("Failed to place an Order")
            console.error(error);

            //if error is 400
            if(error.response && error.response.status == 400){
                
                toast.error(error.response.data.message)

            }
        }
    }

    return(
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[600px] flex flex-col gap-4">
                {
                    cart.map((item,index)=>{
                        return (
                            <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                                <button className="absolute text-red-500 right-[-50px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]"
                                onClick={
                                    ()=>{
                                        const newCart = cart.filter((_, i) => i !== index)
                                        setCart(newCart)
                                    }
                                }
                                ><BiTrash/></button>

                                <img className="h-full aspect-square object-cover" src={item.image}/>
                                <div className="w-[200px] h-full pl-[5px] pt-[10px]">
                                    <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productID}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl"
                                    onClick={
                                        ()=>{
                                            const newCart = [...cart] //you have to make a copy and assign
                                            newCart[index].quantity += 1
                                            setCart(newCart)
                                        }
                                    }
                                    />
                                    <span className="font-semibold text-4xl">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl"
                                    onClick={
                                        ()=>{
                                            const newCart = [...cart] //you have to make a copy and assign
                                            
                                            if(newCart[index].quantity>1){
                                                newCart[index].quantity -= 1
                                            }
                                            setCart(newCart)
                                        }
                                    }
                                    />
                                </div>
                                <div className="w-[180px] h-full flex flex-col">
                                    {
                                        item.labelledPrice>item.price&&
                                        <span className="text-secondary w-full text-lg text-right pr-[10px] line-through mt-[20px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                    }
                                    <span className="font-semibold text-accent w-full text-2xl text-right pr-[10px] mt-[5px]">LKR {item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
                    <button to="" onClick={purchaseCart} className="absolute left-0 bg-accent text-white px-6 py-3 ml-[20px] hover:bg-accent/80">Order</button>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">Total: LKR {getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}