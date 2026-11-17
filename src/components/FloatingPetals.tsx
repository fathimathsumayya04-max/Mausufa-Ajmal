import { useMemo } from 'react';
import './FloatingPetals.css';

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  isGold: boolean;
}

export function FloatingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const pseudoX = (Math.sin((i + 1) * 31.415) * 43758.5453) % 1;
      const normalizedX = Math.abs(pseudoX);

      return {
        id: i,
        left: `${(normalizedX * 94 + 3).toFixed(1)}%`,
        size: Math.floor(normalizedX * 10) + 16, // 16px to 26px
        duration: 9 + (i % 6) * 1.8, // 9s to 18s
        delay: (i % 8) * 1.6,
        isGold: i % 3 === 0,
      };
    });
  }, [count]);

  return (
    <div className="floating-petals-viewport" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Rose petal gradient */}
          <linearGradient id="rose-petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="45%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>

          {/* Shimmering gold petal gradient */}
          <linearGradient id="gold-petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.25}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <svg viewBox="0 0 32 40" fill="none">
            {/* Natural curved flower petal path */}
            <path
              className={petal.isGold ? 'petal-gold' : 'petal-rose'}
              d="M16 2 C9 7, 2 15, 4 25 C6 33, 14 38, 20 37 C26 36, 30 28, 28 20 C26 12, 21 6, 16 2 Z"
            />
            {/* Soft inner petal vein highlight */}
            <path
              d="M16 8 C15 16, 17 24, 19 32"
              stroke={petal.isGold ? '#fff' : '#fbcfe8'}
              strokeWidth="0.8"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
