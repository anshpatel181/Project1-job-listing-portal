import { useState } from "react"
import { NavLink } from "react-router-dom"
import { GoEye, GoEyeClosed } from "react-icons/go";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "../components/PublicNavbar";
import { toast } from "react-toastify";
import ButtonLoader from "../components/loaders/ButtonLoader";

export const Login = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const data = await loginUser(formData);

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if(data.role === "employer") {
          toast.success("You have logged in successfully, redirecting to dashboard")
          navigate("/employer/dashboard", {replace: true });
        }
        else if(data.role === "job_seeker") {
          toast.success("You have logged in successfully, redirecting to dashboard")
          navigate("/seeker/dashboard", {replace: true });
        }

        else {
          toast.error("Invalid Credentials")
        }
      } catch (error) {
        toast.error("Invalid credentials")
      } finally {
        setIsLoading(false)
      }
    };

    return (
      <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-900">
      <PublicNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8
                transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Login to your account
        </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            required
            autoComplete="off"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
 focus:border-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password..."
            required
            autoComplete="off"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-blue-500"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-500 hover:text-blue-600 text-sm">{showPassword ? <GoEye /> : <GoEyeClosed />}</button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg
           hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]
           transition-all duration-200"
           disabled={isLoading}>
          {isLoading ? <ButtonLoader/> : "Login"}
        </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Don't have an account?
          <NavLink
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
    </div>
)
}