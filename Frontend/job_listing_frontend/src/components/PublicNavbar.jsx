import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm relative">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/">
                    <h1 className="text-xl font-bold text-blue-600">
                        JobPortal
                    </h1>
                </a>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden text-slate-600 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-4 items-center">
                    <NavLink
                        to="/login"
                        className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </NavLink>
                </div>
            </div>

            {/* Mobile menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-slate-100 flex flex-col p-4 gap-4 z-50">
                    <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 text-center"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition text-center"
                    >
                        Register
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
