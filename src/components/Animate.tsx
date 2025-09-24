"use client";
import { motion, Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

export function FadeIn({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
