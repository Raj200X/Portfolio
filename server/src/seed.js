import "dotenv/config";
import { connectDb } from "./config/db.js";
import { Portfolio } from "./models/Portfolio.js";
import { portfolioSeed } from "./data/portfolioSeed.js";

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required to seed the database.");
  }

  await connectDb();

  await Portfolio.findOneAndUpdate(
    { slug: "student-portfolio" },
    { slug: "student-portfolio", payload: portfolioSeed },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Portfolio seed data created or updated.");
  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
