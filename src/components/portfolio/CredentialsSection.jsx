import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay }
});

export const CredentialsSection = ({ id, credentials }) => (
  <section id={id} className="relative px-6 py-16 sm:px-10 lg:px-20 xl:px-32">
    <div className="mx-auto max-w-5xl space-y-16">
      <div>
        <motion.h2 {...fadeUp()} className="section-title text-center text-2xl leading-none text-white sm:text-3xl lg:text-4xl">
          Education
        </motion.h2>

        <div className="mt-8 space-y-5">
          {credentials.education.map((item, index) => (
            <motion.article
              key={`${item.degree}-${item.institution}`}
              {...fadeUp(index * 0.06)}
              className="group relative overflow-hidden rounded-[1.35rem] transition"
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_52%,rgba(255,255,255,0.04))] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative rounded-[1.35rem] border border-white/10 bg-[#171717] px-4 py-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="font-display text-lg leading-tight text-white sm:text-xl">{item.degree}</h3>
                    <p className="mt-3 text-xs text-white/58 sm:text-sm">{item.result} | {item.period}</p>
                  </div>
                  <p className="text-xs text-white/68 lg:max-w-xs lg:pt-1 lg:text-right sm:text-sm">{item.institution}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div>
        <motion.h2 {...fadeUp(0.04)} className="section-title text-center text-2xl leading-none text-white sm:text-3xl lg:text-4xl">
          Certificates
        </motion.h2>

        <div className="mt-8 space-y-3">
          {credentials.certifications.map((certification, index) => {
            const Wrapper = certification.link ? motion.a : motion.div;

            return (
              <Wrapper
                key={certification.title}
                {...fadeUp(index * 0.06)}
                href={certification.link || undefined}
                target={certification.link ? "_blank" : undefined}
                rel={certification.link ? "noreferrer" : undefined}
                className="group relative block overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#171717] transition"
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_52%,rgba(255,255,255,0.04))] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative grid md:grid-cols-[7rem_1fr]">
                  <div className="flex items-center border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(23,23,23,0.18))] px-4 py-4 md:border-b-0 md:border-r">
                    <p className="font-sans text-sm uppercase tracking-[0.18em] text-white/55">
                      CERT[{index}]
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/72">
                        {certification.issuer}
                      </p>
                      <h3 className="mt-2 text-base leading-tight text-white/82 sm:text-lg">
                        {certification.title}
                      </h3>
                    </div>
                    {certification.link ? (
                      <ArrowUpRight className="shrink-0 text-white/35 transition group-hover:text-white" size={16} />
                    ) : null}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
