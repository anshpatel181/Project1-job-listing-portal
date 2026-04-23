import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyJobs, deleteJob, toggleJobStatus } from "../services/jobService";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { FaEdit, FaTrashAlt, FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import InlineLoader from "../components/loaders/InlineLoader";
import EmptyState from "../components/common/EmptyState";

export const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job deleted successfully");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const handleToggleStatus = async (jobId) => {
    try {
      const updatedJob = await toggleJobStatus(jobId);

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? updatedJob : job
        )
      );
    } catch {
      toast.error("Failed to update job status");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.jobTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                My Job Listings
              </h1>
              <p className="text-sm text-slate-500">
                Manage your posted jobs
              </p>
            </div>

            <NavLink
              to="/employer/jobs/new"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg
                         hover:bg-blue-700 transition"
            >
              + Post New Job
            </NavLink>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4
                          flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:flex-1
                         focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-auto
                         focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="space-y-4">

            {loading ? (
              <InlineLoader />

            ) : jobs.length === 0 ? (
              <EmptyState
                icon={<FaBriefcase />}
                title="You haven't posted any jobs yet"
                description="Start hiring by creating your first job listing."
                actionText="Post New Job"
                actionLink="/employer/jobs/new"
              />

            ) : filteredJobs.length === 0 ? (
              <EmptyState
                icon={<FaBriefcase />}
                title="No jobs match your filters"
                description="Try adjusting your search or status filter."
              />

            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-slate-200 rounded-xl p-6
                             hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">

                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {job.jobTitle}
                      </h2>

                      <p className="text-sm text-slate-600 mt-1">
                        📍 {job.jobLoc} • 💰 ₹{job.minSalary} – ₹{job.maxSalary}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-slate-100">

                      <button
                        onClick={() => handleToggleStatus(job._id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {job.status === "active" ? "Active" : "Closed"}
                      </button>

                      <div className="flex gap-4">
                        <NavLink
                          to={`/employer/jobs/edit/${job._id}`}
                          className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </NavLink>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-red-600 text-sm hover:underline flex items-center gap-1"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>

                      <NavLink
                        to={`/employer/jobs/${job._id}/applicants`}
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        View Applicants
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