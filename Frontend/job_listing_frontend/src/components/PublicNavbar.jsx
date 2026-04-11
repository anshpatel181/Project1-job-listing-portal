import { NavLink } from "react-router-dom";

export const PublicNavbar = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/">
                    <h1 className="text-xl font-bold text-blue-600">
                        JobPortal
                    </h1>
                </a>
                <div className="flex gap-4">
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
        </nav>
    );
};
