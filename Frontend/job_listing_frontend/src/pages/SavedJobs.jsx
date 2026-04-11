import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getSavedJobs } from "../services/userService";
import { DashboardNavbar } from "../components/DashboardNavbar";
import InlineLoader from "../components/loaders/InlineLoader";
import { FaBookmark } from "react-icons/fa";
import EmptyState from "../components/common/EmptyState";

export const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await getSavedJobs();
        setJobs(res || []);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Saved Jobs
            </h1>
            <p className="text-sm text-slate-500">
              Jobs you’ve saved to apply later
            </p>
          </div>

          <div className="space-y-4">

            {loading ? (
              <InlineLoader />
            ) : jobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  <EmptyState
                    icon={<FaBookmark />}
                    title="No saved jobs yet"
                    description="Save jobs to quickly find and apply later."
                    actionText="Browse Jobs"
                    actionLink="/jobs"
                  />
                </h2>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-slate-200 rounded-xl p-6
                             shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold text-slate-800">
                        {job.jobTitle}
                      </h2>

                      <p className="text-sm text-slate-600">
                        📍 {job.jobLoc} • 💼 {job.jobType}
                      </p>

                      <p className="text-sm text-slate-500">
                        💰 ₹{job.minSalary} – ₹{job.maxSalary}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <NavLink
                        to={`/jobs/${job._id}`}
                        className="inline-flex items-center justify-center
                                   bg-blue-600 text-white px-4 py-2 rounded-lg
                                   hover:bg-blue-700 transition text-sm"
                      >
                        View Details
                      </NavLink>

                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </>
  );
};
