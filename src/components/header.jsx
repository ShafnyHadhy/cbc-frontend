import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-accent h-[90px] text-white px-5 shadow-md">
      <div className="w-full h-full flex items-center relative">

        {/* Desktop Logo */}
        <img
          src="cbclogo.png"
          className="hidden lg:block h-full w-[170px] object-contain absolute left-0"
        />

        {/* Mobile Header */}
        <div className="lg:hidden w-full flex justify-center items-center relative">
          <MdMenu
            className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl cursor-pointer hover:opacity-80 transition"
            onClick={() => setIsMenuOpen(true)}
          />
          <img
            src="cbclogo.png"
            className="h-full w-[150px] object-contain"
          />
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="w-[280px] h-full bg-primary text-secondary flex flex-col shadow-xl animate-slideIn relative overflow-y-auto">
              
              {/* Sidebar Header */}
              <div className="w-full h-[90px] bg-accent flex justify-center items-center relative shadow-md">
                <MdMenu
                  className="absolute left-3 text-3xl text-white cursor-pointer hover:opacity-80 transition"
                  onClick={() => setIsMenuOpen(false)}
                />
                <img
                  src="cbclogo.png"
                  className="h-full w-[150px] object-contain"
                />
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col mt-3 text-lg font-medium">
                <Link
                  to="/"
                  className="px-5 py-4 border-b border-secondary/10 hover:bg-accent hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/product"
                  className="px-5 py-4 border-b border-secondary/10 hover:bg-accent hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="px-5 py-4 border-b border-secondary/10 hover:bg-accent hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-4 border-b border-secondary/10 hover:bg-accent hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  to="/cart"
                  className="px-5 py-4 border-b border-secondary/10 hover:bg-accent hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
              </nav>

              {/* User Section */}
              <div className="w-full flex justify-center py-6 border-t border-secondary/10">
                <UserData />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 text-lg w-full justify-center font-medium">
          <Link to="/" className="hover:opacity-80 transition">Home</Link>
          <Link to="/product" className="hover:opacity-80 transition">Product</Link>
          <Link to="/about" className="hover:opacity-80 transition">About</Link>
          <Link to="/contact" className="hover:opacity-80 transition">Contact Us</Link>
        </nav>

        {/* Desktop User & Cart */}
        <div className="hidden lg:flex items-center gap-8 absolute right-5">
          <UserData />
          <Link to="/cart" className="text-2xl hover:opacity-80 transition">
            <BsCart2 />
          </Link>
        </div>
      </div>
    </header>
  );
}
