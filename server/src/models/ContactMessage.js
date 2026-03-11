import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    source: {
      type: String,
      default: "portfolio-terminal"
    }
  },
  {
    timestamps: true
  }
);

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
