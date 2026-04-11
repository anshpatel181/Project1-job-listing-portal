export const JobCard = ({job, handleApply, applied, loadingApply}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="space-y-3 border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-bold text-slate-800">
                    {job.jobTitle}
                </h1>

                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">
                        📍 {job.jobLoc}
                    </span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">
                        💼 {job.jobType}
                    </span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">
                        💰 ₹{job.minSalary} – ₹{job.maxSalary}
                    </span>
                </div>
            </div>

            <div className="space-y-8 mt-8">

                <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                        Job Description
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        {job.jobDesc}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                        Responsibilities
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        {job.jobRes}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                        Qualifications
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        {job.jobQual}
                    </p>
                </section>

            </div>
            <button
                onClick={handleApply}
                disabled={applied || loadingApply}
                className={`mt-6 px-6 py-3 rounded-lg font-semibold transition ${applied
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
            >
                {applied ? "Applied ✔" : loadingApply ? "Applying..." : "Apply Now"}
            </button>

        </div>
    )
}