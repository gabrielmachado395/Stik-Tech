import { motion } from "framer-motion";
import { ReactNode } from "react";

// Animação de "surgir de baixo para cima" com scroll
const variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
}

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.section
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="visible"
    >
      {children}
    </motion.section>
  )
}