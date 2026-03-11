import express from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { useMockStore } from "../utils/mockStore.js";

const router = express.Router();
const inMemoryMessages = [];

router.post("/", async (req, res) => {
  const { name, email, message, source = "portfolio-terminal" } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const payload = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
    source: String(source)
  };

  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ message: "Please provide valid contact details." });
  }

  if (useMockStore()) {
    inMemoryMessages.push({
      ...payload,
      createdAt: new Date().toISOString()
    });

    return res.status(201).json({
      message: "Message captured in local memory mode.",
      stored: false
    });
  }

  await ContactMessage.create(payload);

  return res.status(201).json({
    message: "Message stored successfully.",
    stored: true
  });
});

export default router;
