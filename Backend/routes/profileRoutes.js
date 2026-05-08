import express from "express"
import { getProfile, updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { handleUpload } from "../middleware/multerErrorHandlerMiddleware.js";

const router = express.Router();
router.get("/get-profile", authMiddleware, getProfile);
router.put("/update-employer-profile", authMiddleware, handleUpload('companyLogo'), updateProfile);
router.put("/update-seeker-profile", authMiddleware, handleUpload('resumeFile'), updateProfile);

export default router;
