import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export const SkillsGalaxy = ({ id, skillGroups }) => {
  const flattenedSkills = useMemo(
    () =>
      skillGroups.flatMap((group) =>
        group.skills.map((skill) => ({
          ...skill,
          category: group.category,
          orbitColor: group.orbitColor,
          summary: group.summary
        }))
      ),
    [skillGroups]
  );

  const [activeSkill, setActiveSkill] = useState(flattenedSkills[0]);

  return (
    <section id={id} className="relative px-6 py-24 sm:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Chapter One"
          title="Skills appear here as a living system, not a checklist."
          description="The core stack stays centered, while adjacent tools orbit around it. Hover any node to inspect what role it plays in the build process."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(115,245,213,0.08),_transparent_35%),radial-gradient(circle_at_center,_rgba(122,162,255,0.1),_transparent_58%)]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 48, ease: "linear" }}
              className="absolute inset-[14%] rounded-full border border-dashed border-white/8"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 60, ease: "linear" }}
              className="absolute inset-[24%] rounded-full border border-dashed border-white/8"
            />

            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/12 bg-black/35 text-center backdrop-blur-xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/45">Core</p>
              <p className="mt-2 font-display text-2xl text-white">MERN</p>
            </div>

            {flattenedSkills.map((skill, index) => (
              <motion.button
                key={`${skill.category}-${skill.name}`}
                type="button"
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -8, scale: 1.06 }}
                className="absolute rounded-full border px-4 py-2 text-left backdrop-blur-xl transition"
                style={{
                  left: skill.x,
                  top: skill.y,
                  borderColor: `${skill.orbitColor}55`,
                  background: `${skill.orbitColor}18`,
                  boxShadow: `0 0 35px ${skill.orbitColor}20`
                }}
              >
                <span className="block font-sans text-[10px] uppercase tracking-[0.35em] text-white/45">{skill.category}</span>
                <span className="mt-1 block text-sm text-white">{skill.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/45">{activeSkill.category}</p>
              <h3 className="mt-4 font-display text-4xl text-white">{activeSkill.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{activeSkill.description}</p>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">Depth</span>
                <span className="text-sm text-white/85">{activeSkill.level}</span>
              </div>
            </div>

            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/42">{group.category}</p>
                    <p className="mt-2 text-sm leading-6 text-white/58">{group.summary}</p>
                  </div>
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: group.orbitColor, boxShadow: `0 0 18px ${group.orbitColor}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
