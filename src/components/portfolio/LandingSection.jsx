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

export const LandingSection = ({ id, profile }) => (
  <section id={id} className="relative flex min-h-screen items-center justify-center px-6 py-20 sm:px-10 lg:px-20 xl:px-32">
    <div className="absolute inset-0">
      <img
        src="/wmremove-transformed.png"
        alt={profile.name}
        className="h-full w-full scale-125 object-cover object-center opacity-55 sm:scale-[1.18] lg:scale-[1.22]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,6,15,0.7),rgba(3,6,15,0.4),rgba(3,6,15,0.82))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(3,6,15,0.35)_55%,rgba(3,6,15,0.88)_100%)]" />
      <div className="absolute inset-0 bg-black/25" />
    </div>

    <div className="mx-auto flex w-full max-w-5xl flex-col items-center pt-20 text-center sm:pt-24">
      <div className="relative z-10 space-y-8">
        <div className="overflow-hidden">
          <h1 className="hero-name flex flex-wrap justify-center gap-x-[0.25em] text-[3.2rem] uppercase leading-[0.95] text-white sm:text-[4.8rem] lg:text-[6rem]">
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

      </div>
    </div>

    <motion.a
      href={profile.social.github}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.8 }}
      className="absolute bottom-32 left-[calc(50%-3.5rem)] z-10 -translate-x-1/2 rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:text-white"
    >
      GitHub
    </motion.a>

    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-white/45"
    >
      Scroll to explore
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
