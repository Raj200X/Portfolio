import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        opacity: visible ? 1 : 0
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.3 }}
      className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 rounded-full border border-white/35 bg-white/10 mix-blend-difference backdrop-blur"
    />
  );
};
