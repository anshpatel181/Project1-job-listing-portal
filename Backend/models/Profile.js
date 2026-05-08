import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    role: {
      type: String, 
      enum: ["job_seeker", "employer"],
      required: true,
    },

    fileName: String,
    fullName: String,
    phoneNo: String,
    location: String,
    skills: String,
    experience: String,
    education: String,
    resumeUrl: String,
    email: String,

    companyName: String,
    industry: String,
    size: Number,
    website: String,
    description: String,
    logoUrl: String,
    companyEmail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
