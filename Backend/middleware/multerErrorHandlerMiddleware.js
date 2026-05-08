import { upload } from "../config/multer.js";

export const handleUpload = (fieldName) => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Maximum size allowed is 5MB.' })
            }
            return res.status(400).json({ message: err.message })
        }
        next()
    })
}
