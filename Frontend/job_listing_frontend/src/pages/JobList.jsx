import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchJobs } from "../services/jobService";
import { getSavedJobs, toggleSaveJob } from "../services/userService";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { toast } from "react-toastify";
import InlineLoader from "../components/loaders/InlineLoader";
import EmptyState from "../components/common/EmptyState";
import { FaSearch } from "react-icons/fa";

export const JobList = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await searchJobs({
          keyword: debouncedKeyword,
          location,
          type: jobType,
        });
        setJobs(data.jobs);
      } catch {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [debouncedKeyword, location, jobType]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const saved = await getSavedJobs();
      setSavedJobs(saved.map((job) => job._id));
    };
    fetchSavedJobs();
  }, []);

  const isJobSaved = (jobId) => savedJobs.includes(jobId);

  const handleSaveClick = async (jobId) => {
    await toggleSaveJob(jobId);
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Find Your Next Job
            </h1>
            <p className="text-slate-500 mt-1">
              Search and filter jobs that match your skills and goals
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="🔍 Keyword (e.g. React)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm
                           focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="📍 Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm
                           focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm
                           focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>

              <button
                onClick={() => {
                  setKeyword("");
                  setLocation("");
                  setJobType("");
                }}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm
                           hover:bg-slate-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{jobs.length} </span>
            job{jobs.length !== 1 && "s"}
          </p>

          <div className="space-y-5">
            {loading ? (<InlineLoader />) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl border border-slate-200 p-6
                             shadow-sm hover:shadow-md hover:-translate-y-0.5
                             transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                    <div className="space-y-2 max-w-3xl">
                      <h2 className="text-xl font-semibold text-slate-800">
                        {job.jobTitle}
                      </h2>

                      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                        <span>📍 {job.jobLoc}</span>
                        <span>💼 {job.jobType}</span>
                        <span>💰 ₹{job.minSalary} – ₹{job.maxSalary}</span>
                      </div>

                      <p className="text-slate-600 text-sm line-clamp-2">
                        {job.jobDesc}
                      </p>
                    </div>

                    <div className="flex lg:flex-col justify-between lg:items-end gap-4">
                      <NavLink
                        to={`/jobs/${job._id}`}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg
                                   hover:bg-blue-700 transition text-sm font-medium"
                      >
                        View Details
                      </NavLink>

                      <button
                        onClick={() => handleSaveClick(job._id)}
                        className={`text-sm font-medium transition ${isJobSaved(job._id)
                          ? "text-red-500"
                          : "text-slate-500 hover:text-blue-600"
                          }`}
                      >
                        ❤️ {isJobSaved(job._id) ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
              : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-800 mb-2">
                    <EmptyState
                      icon={<FaSearch />}
                      title="No jobs match your search"
                      description="Try adjusting your filters or searching with different keywords."
                      actionText="Clear Filters"
                      actionLink="/jobs"
                    />
                  </h2>
                  <p className="text-slate-500">
                    Try adjusting your search filters or keywords
                  </p>
                </div>
              )}
          </div>

        </div>
      </div>
    </>
  );
};
