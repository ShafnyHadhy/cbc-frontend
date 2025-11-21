import { useState } from "react";
import { BsCart2 } from "react-icons/bs"
import { MdMenu } from "react-icons/md"
import { Link } from "react-router-dom"

export default function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="w-full bg-accent h-[100px] text-white px-[30px]">
            <div className="w-full h-full flex relative">
                <img src="cbclogo.png" className="hidden lg:flex h-full w-[170px] object-cover absolute"/>
                <div className="lg:hidden w-full flex justify-center relative">
                    <MdMenu 
                        className="absolute left-0 top-1/2 -translate-y-1/2 lg:hidden text-3xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    </MdMenu>
                    <img src="cbclogo.png" className="lg:hidden h-full w-[170px] object-cover "/>
                </div>
                {
                    isMenuOpen &&
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] z-100">
                        <div className="w-[300px] h-full bg-primary flex flex-col text-secondary">
                            <div className="lg:hidden w-full h-[100px] bg-accent flex justify-center items-center relative">
                                <MdMenu 
                                    className="absolute left-2 top-1/2 -translate-y-1/2 lg:hidden text-3xl text-white"
                                    onClick={() => setIsMenuOpen(false)}>
                                </MdMenu>
                                <img src="cbclogo.png" className="lg:hidden h-full w-[170px] object-cover "/>
                            </div>
                            <a href="/" className="p-4 border-b border-secondary/10">
                                Home
                            </a>
                            <a href="/product" className="p-4 border-b border-secondary/10">
                                Products
                            </a>
                            <a href="/about" className="p-4 border-b border-secondary/10">
                                About Us
                            </a>
                            <a href="/contact" className="p-4 border-b border-secondary/10">
                                Contact US
                            </a>
                            <a href="/cart" className="p-4 border-b border-secondary/10">
                                Cart
                            </a>
                        </div>
                    </div>
                }
                <div className="hidden h-full lg:flex justify-center items-center w-full text-lg gap-[20px]    ">
                    <Link to="/">Home</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <Link to="/cart" className="h-full absolute right-0 text-2xl hidden lg:flex justify-center items-center">
                     <BsCart2 />
                </Link>
            </div>
        </header>
    )
}