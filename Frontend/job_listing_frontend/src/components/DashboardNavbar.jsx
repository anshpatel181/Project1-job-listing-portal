import { NavLink } from "react-router-dom";
import { LogoutButton } from "./Logout";

export const DashboardNavbar = () => {
  const role = localStorage.getItem("role");

  const navLinkClass = ({ isActive }) => 
    isActive ?  "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-slate-600 hover:text-blue-600";

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink to={role === "job_seeker" ? "/seeker/dashboard" : "/employer/dashboard"} className="text-xl font-bold text-blue-600">
          JobPortal
        </NavLink>

        <div className="flex items-center gap-6 text-sm font-medium">

          {role === "employer" && (
            <>
              <NavLink to="/employer/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/employer/jobs" className={navLinkClass}>My Jobs</NavLink>
              <NavLink to="/employer/jobs/new" className={navLinkClass}>Post Job</NavLink>
              <NavLink to="/employer/profile" className={navLinkClass}>Company</NavLink>
            </>
          )}

          {role === "job_seeker" && (
            <>
              <NavLink to="/seeker/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/jobs" className={navLinkClass}>Find Jobs</NavLink>
              <NavLink to="/saved-jobs" className={navLinkClass}>Saved Jobs</NavLink>
              <NavLink to="/seeker/profile" className={navLinkClass}>Profile</NavLink>
              <NavLink to="/applications" className={navLinkClass}>Applied Jobs</NavLink>
            </>
          )}

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
