import Job from "../models/Job.js";


export const createJob = async (req, res) => {
  
  try {
    const job = await Job.create({
      employer: req.user.id,
      ...req.body,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    console.error("ERROR 👉", error.message);
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    console.log(job);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== req.user.id) { 
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(job, req.body);
    await job.save();

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

export const getFilteredJobs = async (req, res) => {
  try {
    const { keyword, location, type } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { jobTitle: { $regex: keyword, $options: "i" } },
        { jobDesc: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.jobLoc = { $regex: location, $options: "i" };
    }

    if (type) {
      query.jobType = type;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({jobs});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

  export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

export const toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = job.status === "active" ? "closed" : "active";
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job status" });
  }
};
