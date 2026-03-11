import express from "express";
import { Portfolio } from "../models/Portfolio.js";
import { portfolioSeed } from "../data/portfolioSeed.js";
import { useMockStore } from "../utils/mockStore.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  if (useMockStore()) {
    return res.json({ portfolio: portfolioSeed, source: "seed" });
  }

  let document = await Portfolio.findOne({ slug: "student-portfolio" }).lean();

  if (!document) {
    document = await Portfolio.create({
      slug: "student-portfolio",
      payload: portfolioSeed
    });
  }

  return res.json({
    portfolio: document.payload || portfolioSeed,
    source: "database"
  });
});

export default router;
