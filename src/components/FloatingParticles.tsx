import React, { useMemo } from "react";
import { motion } from "motion/react";

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -25,
      opacity: Math.random() * 0.5 + 0.2,
      color: i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#ffffff" : "#c084fc",
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 5}vw`],
            y: [`${p.y}vh`, `${p.y - 20}vh`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}80`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
