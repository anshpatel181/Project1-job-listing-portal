import { NavLink } from "react-router-dom";
import { PublicNavbar } from "../components/PublicNavbar";

export const ErrorPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-900">
            <PublicNavbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-6xl sm:text-8xl font-bold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <NavLink
                    to="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md active:scale-95"
                >
                    Back to Home
                </NavLink>
            </div>
        </div>
    );
}