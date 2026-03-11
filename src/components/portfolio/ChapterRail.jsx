import { motion } from "framer-motion";

export const ChapterRail = ({ sections, activeSection, profile }) => (
  <div className="pointer-events-none fixed inset-y-0 z-30 hidden xl:flex">
    <div className="pointer-events-auto ml-8 flex w-24 flex-col justify-between py-10">
      <div className="space-y-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-white/40">Portfolio</p>
        <div className="space-y-1">
          <p className="font-display text-lg text-white">{profile.name}</p>
          <p className="max-w-[9rem] text-xs leading-relaxed text-white/45">{profile.title}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3 text-white/45 transition hover:text-white"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.4em]">{section.index}</span>
              <div className="relative h-px w-8 bg-white/10">
                {isActive ? (
                  <motion.span
                    layoutId="chapter-rail"
                    className="absolute inset-y-0 left-0 w-full bg-white"
                  />
                ) : null}
              </div>
              <span className="text-xs uppercase tracking-[0.3em]">{section.label}</span>
            </a>
          );
        })}
      </nav>

      <a
        href={profile.social.github}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 transition hover:text-white"
      >
        Open GitHub
      </a>
    </div>
  </div>
);
