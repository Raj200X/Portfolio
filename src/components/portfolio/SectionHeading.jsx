import { motion } from "framer-motion";

export const SectionHeading = ({ eyebrow, title, description, align = "left" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.45 }}
    className={`max-w-2xl space-y-5 ${align === "center" ? "mx-auto text-center" : ""}`}
  >
    <p className="font-sans text-[10px] uppercase tracking-[0.55em] text-white/45">{eyebrow}</p>
    <h2 className="section-title text-3xl leading-none text-white sm:text-4xl">{title}</h2>
    <p className="text-sm leading-7 text-white/58 sm:text-base">{description}</p>
  </motion.div>
);
