import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header className="w-full bg-accent h-[100px] text-white px-[30px]">
            <div className="w-full h-full flex relative">
                <img src="cbclogo.png" className="h-full w-[170px] object-cover absolute"/>
                <div className="h-full flex justify-center items-center w-full text-lg gap-[20px]    ">
                    <Link to="/">Home</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
        </header>
    )
}