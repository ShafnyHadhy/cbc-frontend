import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [name, setName] = useState();

    const [cart, setCart] = useState(location.state);

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    async function purchaseCart() {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("Please login to place an order!!!");
            navigate("/login");
            return;
        }

        try {
            const items = [];

            for (let i = 0; i < cart.length; i++) {
                items.push({
                    productID: cart[i].productID,
                    quantity: cart[i].quantity,
                });
            }

            await axios.post(
                import.meta.env.VITE_API_URL + "/api/orders",
                {
                    address: address,
                    customerName: name==""?null:name,
                    items: items,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order placed successfully");
        } catch (error) {
            toast.error("Failed to place an Order");
            console.error(error);

            if (error.response && error.response.status == 400) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className="w-full lg:h-[calc(100vh-100px)] overflow-scroll bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[370px] lg:w-[600px] flex flex-col gap-4">
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0"
                        >
                            {/* Delete Button */}
                            <button
                                className="absolute text-red-500 right-[-50px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]"
                                onClick={() => {
                                    const newCart = cart.filter(
                                        (_, i) => i !== index
                                    );
                                    setCart(newCart);
                                }}
                            >
                                <BiTrash />
                            </button>

                            {/* Image */}
                            <img
                                className="h-[100px] lg:h-full aspect-square object-cover"
                                src={item.image}
                            />

                            {/* Title + ID */}
                            <div className="w-full lg:w-[200px] text-center h-[100px] lg:h-full pl-[5px] pt-[10px]">
                                <h1 className="font-semibold text-lg w-full text-wrap">
                                    {item.name}
                                </h1>
                                <span className="text-sm text-secondary">
                                    {item.productID}
                                </span>
                            </div>

                            {/* Quantity Controller */}
                            <div className="w-[100px] h-full flex flex-row lg:flex-col justify-center items-center">
                                <CiCircleChevUp
                                    className="text-3xl"
                                    onClick={() => {
                                        const newCart = [...cart];
                                        newCart[index].quantity += 1;
                                        setCart(newCart);
                                    }}
                                />
                                <span className="font-semibold text-4xl">
                                    {item.quantity}
                                </span>
                                <CiCircleChevDown
                                    className="text-3xl"
                                    onClick={() => {
                                        const newCart = [...cart];
                                        if (newCart[index].quantity > 1) {
                                            newCart[index].quantity -= 1;
                                        }
                                        setCart(newCart);
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-full lg:w-[180px] lg:h-full flex items-center justify-center flex-row lg:flex-col">
                                {item.labelledPrice > item.price && (
                                    <span className="text-secondary lg:w-full text-lg text-center lg:text-right pr-[10px] line-through mt-1 lg:mt-[20px]">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="font-semibold text-accent lg:w-full text-2xl text-center lg:text-right pr-[10px] lg:mt-[5px]">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                <div className="w-full lg:w-full h-[120px] bg-white flex lg:flex-row justify-center items-center relative">
                    <div className="w-full h-full flex justify-between items-center p-4 gap-2">
                        <label htmlFor="name" className="text-sm text-secondary mb-2 font-bold">
                            Name
                        </label>
                        <input
                            type="input"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[400px] h-[50px] border border-secondary rounded-md px-3"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-full h-[120px] bg-white flex lg:flex-row justify-center items-center relative">
                    <div className="w-full h-full flex justify-between items-center p-4 gap-2">
                        <label htmlFor="address" className="text-sm text-secondary mb-2 font-bold">
                            Shipping Address
                        </label>
                        <textarea
                            type="input"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-[400px] h-[100px] border border-secondary rounded-md px-3"
                        />
                    </div>
                </div>

                {/* TOTAL + ORDER BUTTON */}
                <div className="w-full lg:w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
                    <button
                        onClick={purchaseCart}
                        className="lg:absolute left-0 bg-accent text-white px-6 py-3 lg:ml-[20px] hover:bg-accent/80"
                    >
                        Order
                    </button>

                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-center lg:text-right text-2xl lg:pr-[10px] mt-[5px]">
                            Total: LKR {getTotal().toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
