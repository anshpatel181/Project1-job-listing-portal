import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
<<<<<<< HEAD
    role: { type: String, enum: ["job_seeker", "employer"], required: true, },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true },
=======
    role: {
      type: String,
      enum: ["job_seeker", "employer"],
      required: true,
    },
  },
  { timestamps: true }
>>>>>>> c3d9cc3 (Final project update)
);

export default mongoose.model("User", userSchema);
