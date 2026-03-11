import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "student-portfolio"
    },
    payload: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
