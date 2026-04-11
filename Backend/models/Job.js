import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDesc: {
      type: String,
      required: true,
    },
    
    jobRes: {
      type: String,
      required: true,
    },
    
    jobQual: {
      type: String,
      required: true,
    },
    
    jobLoc: {
      type: String,
      required: true,
    },
    
    minSalary: {
      type: Number,
      required: true,
    },
    
    maxSalary: {
      type: Number,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
    },
    
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  { timestamps: true }, 
);

export default mongoose.model("Job", jobSchema);
