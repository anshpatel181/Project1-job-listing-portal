import { useState } from "react";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { createJob } from "../services/jobService";
import ButtonLoader from "../components/loaders/ButtonLoader";
import { toast } from "react-toastify";

export const CreateJob = () => {
    const [jobInput, setJobInput] = useState({
        jobTitle: "",
        jobDesc: "",
        jobRes: "",
        jobQual: "",
        jobLoc: "",
        minSalary: "",
        maxSalary: "",
        jobType: "",
    });

    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const {
        jobTitle,
        jobDesc,
        jobRes,
        jobQual,
        jobLoc,
        minSalary,
        maxSalary,
        jobType,
    } = jobInput;

    const isSalaryInvalid =
        minSalary && maxSalary && Number(minSalary) > Number(maxSalary);

    const isFormValid =
        jobTitle &&
        jobDesc &&
        jobRes &&
        jobQual &&
        jobLoc &&
        minSalary &&
        maxSalary &&
        jobType &&
        !isSalaryInvalid;

    const handlePublishJobSubmit = (e) => {
        e.preventDefault();
        console.log(jobInput);
        setIsLoading(true)
        createJob(jobInput);
        toast.success("Job Posted Successfully")
        setJobInput({
            jobTitle: "",
            jobDesc: "",
            jobRes: "",
            jobQual: "",
            jobLoc: "",
            minSalary: "",
            maxSalary: "",
            jobType: ""
        })
        setIsLoading(false)
    }

    const inputClass =
        "w-full border border-slate-300 rounded-lg px-4 py-2 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div>
            <DashboardNavbar />
            <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                        <p className="text-sm text-slate-500 mb-2">
                            Employer / Jobs / Create
                        </p>

                        <div className="mb-8 border-b border-slate-200 pb-4">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Post a New Job
                            </h1>
                            <p className="text-sm text-slate-500">
                                Fill in the details below to publish a job listing
                            </p>
                        </div>

                        {success && (
                            <div className="mb-6 bg-green-100 text-green-700 p-3 rounded-lg text-sm">
                                Job posted successfully!
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handlePublishJobSubmit}>
                            <section>
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Job Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Job Title
                                        </label>
                                        <input
                                            className={inputClass}
                                            placeholder="e.g. Frontend Developer"
                                            name="jobTitle"
                                            value={jobTitle}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            This title will be visible to job seekers
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Job Description
                                        </label>
                                        <textarea
                                            rows="4"
                                            className={inputClass}
                                            placeholder="Describe the role and expectations"
                                            name="jobDesc"
                                            value={jobDesc}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={500}
                                        />
                                        <p className="text-xs text-slate-500 text-right">
                                            {jobDesc.length}/500
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Location
                                        </label>
                                        <input
                                            className={inputClass}
                                            placeholder="e.g. Remote / Bangalore"
                                            name="jobLoc"
                                            value={jobLoc}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label>Select Job Type</label>
                                        <select
                                            value={jobType}
                                            onChange={handleInputChange}
                                            name="jobType"
                                            className="border border-slate-300 rounded-lg px-4 py-2 text-sm
                           focus:ring-2 focus:ring-blue-500 ml-4"
                                        >
                                            <option value="">All Job Types</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Requirements
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Responsibilities
                                        </label>
                                        <textarea
                                            rows="3"
                                            className={inputClass}
                                            placeholder="List key responsibilities (use bullet points)"
                                            name="jobRes"
                                            value={jobRes}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Qualifications
                                        </label>
                                        <textarea
                                            rows="3"
                                            className={inputClass}
                                            placeholder="Required skills or experience"
                                            name="jobQual"
                                            value={jobQual}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Compensation
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Minimum Salary
                                        </label>
                                        <input
                                            type="number"
                                            className={inputClass}
                                            placeholder="e.g. 40000"
                                            name="minSalary"
                                            value={minSalary}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Maximum Salary
                                        </label>
                                        <input
                                            type="number"
                                            className={inputClass}
                                            placeholder="e.g. 80000"
                                            name="maxSalary"
                                            value={maxSalary}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {isSalaryInvalid && (
                                    <p className="text-sm text-red-600 mt-2">
                                        Minimum salary cannot be greater than maximum salary
                                    </p>
                                )}
                            </section>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isLoading}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all
                ${isFormValid
                                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95"
                                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                        }`}
                                >
                                    {isLoading ? <ButtonLoader /> : "Publish Job"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hidden lg:block">
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Job Preview
                        </h2>

                        <p className="text-sm text-slate-500 mb-4">
                            This is how your job will appear to job seekers
                        </p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-blue-600">
                                {jobTitle || "Job Title"}
                            </h3>

                            <p className="text-sm text-slate-600">
                                📍 {jobLoc || "Location"}
                            </p>

                            <p className="text-sm text-slate-700 whitespace-pre-line">
                                {jobDesc || "Job description will appear here."}
                            </p>

                            <p className="text-sm text-slate-700">
                                💰{" "}
                                {minSalary && maxSalary
                                    ? `₹${minSalary} – ₹${maxSalary}`
                                    : "Salary range"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
