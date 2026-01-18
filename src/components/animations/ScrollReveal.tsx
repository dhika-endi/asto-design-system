import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "scale": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "fade": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

// Global cache to track which elements have been animated
const animatedElements = new Set<string>();

// Generate a unique ID based on content position
let elementCounter = 0;

export const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  className = "",
  id,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementId] = useState(() => id || `scroll-reveal-${elementCounter++}`);
  const [hasAnimated, setHasAnimated] = useState(() => animatedElements.has(elementId));
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animatedElements.add(elementId);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, elementId]);

  // If already animated, show content immediately without animation
  if (hasAnimated) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Reset animations (useful for development/testing)
export const resetScrollRevealAnimations = () => {
  animatedElements.clear();
  elementCounter = 0;
};