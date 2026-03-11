import { motion } from "framer-motion";

export const LoadingScreen = () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(115,245,213,0.16),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(122,162,255,0.18),_transparent_42%)]" />
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center gap-5"
    >
      <div className="h-px w-32 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ["-100%", "120%"] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
        />
      </div>
      <p className="font-sans text-[10px] uppercase tracking-[0.55em] text-white/55">Building the portfolio journey</p>
    </motion.div>
  </div>
);
