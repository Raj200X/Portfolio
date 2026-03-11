import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.25 + index * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const LandingSection = ({ id, profile, stats }) => (
  <section id={id} className="relative flex min-h-screen items-center px-6 py-20 sm:px-10 lg:px-20 xl:px-32">
    <div className="mx-auto grid w-full max-w-7xl gap-14 xl:grid-cols-[1.3fr_0.9fr] xl:items-end">
      <div className="space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-sans text-[10px] uppercase tracking-[0.55em] text-white/50"
        >
          Chapter Zero / Arrival
        </motion.p>

        <div className="overflow-hidden">
          <h1 className="font-display flex flex-wrap gap-x-[0.25em] text-[4rem] uppercase leading-[0.9] text-white sm:text-[5.5rem] lg:text-[7rem]">
            {profile.name.split(" ").map((word, wordIndex, arr) => {
              const previousChars = arr.slice(0, wordIndex).join("").length;
              return (
                <span key={wordIndex} className="inline-flex">
                  {word.split("").map((character, index) => (
                    <motion.span
                      key={`${wordIndex}-${index}`}
                      custom={previousChars + index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {character}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="max-w-xl text-base leading-8 text-white/65 sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full border border-white/15 bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-black transition hover:scale-[1.02]"
          >
            Enter Project Universe
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:text-white"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
        <div className="relative space-y-8">
          <div className="space-y-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Identity</p>
            <p className="text-2xl leading-tight text-white">{profile.title}</p>
            <p className="text-sm leading-7 text-white/58">{profile.intro}</p>
          </div>

          <div className="grid gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</span>
                <span className="text-sm text-white/82">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
            <span>{profile.availability}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.a
      href="#story"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-white/40"
    >
      Scroll the story
      <span className="flex h-14 w-7 items-start justify-center rounded-full border border-white/15 p-1">
        <motion.span
          animate={{ y: [0, 24, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
          className="h-2 w-2 rounded-full bg-white"
        />
      </span>
    </motion.a>
  </section>
);
