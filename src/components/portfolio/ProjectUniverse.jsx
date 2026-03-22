import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export const ProjectUniverse = ({ id, projects }) => (
  <section id={id} className="relative px-6 py-24 sm:px-10 lg:px-20 xl:px-32">
    <div className="mx-auto max-w-7xl space-y-14">
      <SectionHeading
        eyebrow=""
        title="Projects"
        description=""
        align="center"
      />

      <div className="relative -mx-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:-mx-20 lg:px-20 xl:-mx-32 xl:px-32">
        <div className="flex min-w-max gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:w-[24rem] lg:w-[28rem]"
            >
              <div
                className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                style={{ backgroundImage: project.accent }}
              />
              <div className="relative flex h-full flex-col">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <div className="space-y-4">
                    <h3 className="font-display text-4xl text-white">{project.title}</h3>
                    <p className="text-sm leading-7 text-white/62">{project.summary}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/58"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/38">Status</p>
                  <p className="mt-2 text-sm text-white/76">{project.status}</p>
                </div>

                <div className="mt-auto flex gap-3 pt-8">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-black transition hover:scale-[1.02]"
                  >
                    <ArrowUpRight size={14} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
