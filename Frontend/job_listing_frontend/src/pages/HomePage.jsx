import { NavLink } from "react-router-dom";
import { FaUserTie, FaBriefcase, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { PublicNavbar } from "../components/PublicNavbar";

export const HomePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col dark:bg-slate-900">
      <PublicNavbar />

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div
          className="
            max-w-6xl mx-auto px-6 py-24
            grid grid-cols-1 md:grid-cols-2
            gap-12 items-center
          "
        >
          <div className="text-center md:text-left" data-aos="fade-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              A Smarter Way to Hire & Get Hired
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-xl md:max-w-none dark:text-slate-300">
              A modern job portal connecting job seekers and employers to build
              careers and teams faster, smarter, and securely.
            </p>

            <div className="flex flex-col sm:flex-row md:justify-start justify-center gap-4">
              <NavLink
                to="/register"
                className="
                  bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold
                  shadow-md hover:shadow-lg hover:bg-blue-100
                  active:scale-95 transition-all
                "
              >
                Get Started
              </NavLink>

              <NavLink
                to="/login"
                className="
                  bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold
                  shadow-md hover:shadow-lg hover:bg-blue-100
                  active:scale-95 transition-all
                "
              >
                Login
              </NavLink>
            </div>
          </div>

          <div
            className="flex justify-center md:justify-end"
            data-aos="fade-left"
          >
            <img
              src="/hero-illustration.svg"
              alt="Job portal illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2 dark:text-white">
              <FaUserCheck /> For Job Seekers
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>✔ Create your profile</li>
              <li>✔ Upload your resume</li>
              <li>✔ Explore job opportunities</li>
              <li>✔ Apply with ease</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3 text-indigo-600 flex items-center gap-2 dark:text-white">
              <FaUserTie /> For Employers
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>✔ Create company profile</li>
              <li>✔ Post job openings</li>
              <li>✔ Review applications</li>
              <li>✔ Hire the best talent</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
            Platform Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <FaShieldAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">
                Secure Authentication
              </h4>
              <p className="text-slate-600 text-sm dark:text-slate-300">
                JWT-based login system with role-based access control.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <FaBriefcase className="text-3xl text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">
                Profile Management
              </h4>
              <p className="text-slate-600 text-sm dark:text-slate-300">
                Job seekers and employers can manage detailed profiles.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">
                Modern UI
              </h4>
              <p className="text-slate-600 text-sm dark:text-slate-300">
                Clean, responsive design built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-12 dark:bg-slate-900" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              10K+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Job Seekers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              2K+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Employers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-green-400">
              15K+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Jobs Posted</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 dark:text-slate-300">
            Join today and take the next step in your career or hiring journey.
          </p>

          <NavLink
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Create Free Account
          </NavLink>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 text-center py-6 px-4 dark:bg-black">
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
