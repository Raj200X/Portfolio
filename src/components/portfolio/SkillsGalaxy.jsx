import { useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export const SkillsGalaxy = ({ id, skillGroups }) => {
  const rings = [140, 210, 285, 345];
  const slots = [
    { ring: 2, angle: -140 },
    { ring: 1, angle: -92 },
    { ring: 2, angle: -48 },
    { ring: 3, angle: -12 },
    { ring: 2, angle: 28 },
    { ring: 1, angle: 74 },
    { ring: 2, angle: 122 },
    { ring: 3, angle: 158 },
    { ring: 2, angle: 202 },
    { ring: 1, angle: 242 },
    { ring: 2, angle: 286 },
    { ring: 3, angle: 324 }
  ];

  const flattenedSkills = useMemo(() => {
    const skills = skillGroups.flatMap((group) =>
      group.skills.map((skill) => ({
        ...skill,
        category: group.category,
        orbitColor: group.orbitColor
      }))
    );

    return skills.map((skill, index) => {
      const slot = slots[index % slots.length];
      const radius = rings[slot.ring];
      const angleDeg = slot.angle;
      const angle = (angleDeg * Math.PI) / 180;

      return {
        ...skill,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    });
  }, [skillGroups]);

  return (
    <section id={id} className="relative px-6 py-24 sm:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow=""
          title="Skills"
          description=""
          align="center"
        />

        <div className="flex justify-center">
          <div className="relative min-h-[50rem] w-full max-w-[88rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_35%),radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_58%)]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 46, ease: "linear" }}
              className="absolute inset-0"
              style={{ transformOrigin: "50% 50%" }}
            >
              {rings.map((radius) => (
                <div
                  key={radius}
                  className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/10"
                  style={{
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                />
              ))}

              {flattenedSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="absolute z-10"
                  style={{
                    left: `calc(50% + ${skill.x}px)`,
                    top: `calc(50% + ${skill.y}px)`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <motion.button
                    type="button"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 46, ease: "linear" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-full border px-4 py-2 text-left backdrop-blur-xl transition"
                    style={{
                      borderColor: `${skill.orbitColor}55`,
                      background: `${skill.orbitColor}18`,
                      boxShadow: `0 0 30px ${skill.orbitColor}1f`
                    }}
                  >
                    <span className="block font-sans text-[10px] uppercase tracking-[0.35em] text-white/45">
                      {skill.category}
                    </span>
                    <span className="mt-1 block whitespace-nowrap text-sm text-white">{skill.name}</span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/20 bg-black/35 text-center backdrop-blur-xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/42">Core</p>
              <p className="mt-3 font-display text-3xl text-white">MERN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
