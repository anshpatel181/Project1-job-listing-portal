import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    if(req.user.role !== "job_seeker") {
      return res.status(403).json({message: "Only job seekers can apply for jobs"})
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }


    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: job._id,
      seeker: req.user.id,
      employer: job.employer,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to apply" });
  }
};

export const checkApplied = async (req, res) => {
  try {
    const application = await Application.findOne({
      job: req.params.jobId,
      seeker: req.user.id,
    });

    res.status(200).json({
      applied: !!application,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to check application status" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      seeker: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({ job: job._id })
      .populate("seeker", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const employerStats = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });

    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const shortlisted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "shortlisted",
    });

    res.status(200).json({
      totalJobs: jobs.length,
      totalApplications,
      shortlisted,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

