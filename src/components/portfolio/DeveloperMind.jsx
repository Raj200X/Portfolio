import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export const DeveloperMind = ({ id, mindset }) => (
  <section id={id} className="relative px-6 py-24 sm:px-10 lg:px-20 xl:px-32">
    <div className="mx-auto max-w-7xl space-y-14">
      <SectionHeading
        eyebrow="Chapter Three"
        title="This is the layer behind the code: how I think, what I practice, and where I’m going next."
        description="The goal is not just to ship features. It is to build better judgment around tradeoffs, problem solving, and systems that scale past the first version."
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {mindset.principles.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Node {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-3xl text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-[2.25rem] border border-white/10 bg-black/25 p-7 backdrop-blur-2xl"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Roadmap Path</p>
          <div className="relative mt-8 space-y-6 before:absolute before:left-[0.35rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/10">
            {mindset.roadmap.map((step, index) => (
              <div key={step} className="relative pl-8">
                <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-white" />
                <p className="text-sm leading-7 text-white/68">{step}</p>
                {index !== mindset.roadmap.length - 1 ? (
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
