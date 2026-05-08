import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import {v2 as cloudinary} from "cloudinary"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const isPdf = file.mimetype === "application/pdf"

        return {
            folder: isPdf ? "resumes" : "logos",
            allowed_formats: ["pdf", "png", "jpg", "jpeg", "webp", "svg"],
            resource_type: isPdf ? "raw" : "image",
            public_id: `${Date.now()} - ${file.originalname}`
        }
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ["application/pdf", "image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg+xml"]

    if(allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only pdf or image files are allowed"), false)
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})