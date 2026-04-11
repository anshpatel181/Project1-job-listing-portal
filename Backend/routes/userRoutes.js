import { toggleSaveJob, getSavedJobs } from "../controllers/userController.js";
import protect  from "../middleware/authMiddleware.js";
import express from "express"

const router = express.Router();

router.post("/save-job/:jobId", protect, toggleSaveJob);
router.get("/saved-jobs", protect, getSavedJobs);

export default router;
