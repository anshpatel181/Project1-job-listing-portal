import express from "express";
import protect from "../middleware/authMiddleware.js";
import { applyToJob, checkApplied, employerStats, getApplicantsForJob, getMyApplications, updateApplicationStatus } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/check/:jobId", protect, checkApplied);
router.get("/job/:jobId", protect, getApplicantsForJob)
router.get("/my", protect, getMyApplications);
router.get("/employer/stats", protect, employerStats);
router.post("/:jobId/apply", protect, applyToJob);
router.patch("/:applicationId/status", protect, updateApplicationStatus);



export default router;
