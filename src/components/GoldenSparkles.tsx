import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './GoldenSparkles.css';

interface SparkleItem {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  isStar: boolean;
}

export function GoldenSparkles({ count = 22 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Very gentle background parallax movement (-14px to +14px)
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-14, 14]
  );

  const sparkles = useMemo<SparkleItem[]>(() => {
    // Deterministic pseudo-random generation to avoid SSR/hydration jitter
    return Array.from({ length: count }, (_, i) => {
      const pseudoX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const pseudoY = (Math.cos(i * 78.233) * 43758.5453) % 1;
      const normalizedX = Math.abs(pseudoX);
      const normalizedY = Math.abs(pseudoY);

      return {
        id: i,
        top: `${(normalizedY * 96).toFixed(1)}%`,
        left: `${(normalizedX * 96 + 2).toFixed(1)}%`,
        size: Math.floor(normalizedX * 4) + 3, // 3px to 7px
        duration: 14 + (i % 5) * 2.5, // 14s to 24s (calm, slow, gentle ambient drift)
        delay: (i % 7) * 0.9,
        isStar: i % 4 === 0,
      };
    });
  }, [count]);

  return (
    <div ref={containerRef} className="golden-sparkles-container" aria-hidden="true">
      <motion.div
        style={{
          y: parallaxY,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {sparkles.map((sp) =>
          sp.isStar ? (
            <div
              key={sp.id}
              className="golden-sparkle golden-sparkle--star"
              style={{
                top: sp.top,
                left: sp.left,
                width: `${sp.size + 4}px`,
                height: `${sp.size + 4}px`,
                animationDuration: `${sp.duration}s`,
                animationDelay: `${sp.delay}s`,
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6Z" />
              </svg>
            </div>
          ) : (
            <div
              key={sp.id}
              className="golden-sparkle"
              style={{
                top: sp.top,
                left: sp.left,
                width: `${sp.size}px`,
                height: `${sp.size}px`,
                animationDuration: `${sp.duration}s`,
                animationDelay: `${sp.delay}s`,
              }}
            />
          )
        )}
      </motion.div>
    </div>
  );
}
