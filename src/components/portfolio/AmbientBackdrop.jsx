import { motion } from "framer-motion";

const stars = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  size: index % 5 === 0 ? 3 : 2,
  x: `${(index * 13) % 100}%`,
  y: `${(index * 29) % 100}%`,
  delay: index * 0.15
}));

export const AmbientBackdrop = ({ mousePosition }) => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <motion.div
      className="absolute -left-24 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(115,245,213,0.22),_transparent_62%)] blur-3xl"
      animate={{ x: mousePosition.x * 60, y: mousePosition.y * 40 }}
      transition={{ type: "spring", stiffness: 30, damping: 18 }}
    />
    <motion.div
      className="absolute right-[-8rem] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(122,162,255,0.2),_transparent_60%)] blur-3xl"
      animate={{ x: mousePosition.x * -80, y: mousePosition.y * -45 }}
      transition={{ type: "spring", stiffness: 30, damping: 20 }}
    />
    <motion.div
      className="absolute bottom-[-12rem] left-[25%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(247,178,103,0.12),_transparent_58%)] blur-3xl"
      animate={{ x: mousePosition.x * 30, y: mousePosition.y * -70 }}
      transition={{ type: "spring", stiffness: 25, damping: 18 }}
    />

    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(3,6,15,0.18),_rgba(3,6,15,0.7))]" />

    {stars.map((star) => (
      <motion.span
        key={star.id}
        className="absolute rounded-full bg-white/70"
        style={{ left: star.x, top: star.y, width: star.size, height: star.size }}
        animate={{ opacity: [0.2, 0.85, 0.2], scale: [1, 1.4, 1] }}
        transition={{
          duration: 3.8 + star.delay,
          delay: star.delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);
