import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export const AboutSection = ({ id, profile }) => {
  return (
    <section id={id} className="relative px-6 py-20 sm:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="" title="About" description="" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm sm:p-10"
        >
          <p className="text-base leading-8 text-white/72 sm:text-lg">
            {profile.intro} I focus on building clean interfaces, predictable APIs, and products that
            feel intentional rather than overdesigned. The goal is simple: ship work that looks
            refined, performs well, and stays maintainable as it grows.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
