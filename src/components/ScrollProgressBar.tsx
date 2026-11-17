import { useEffect, useRef } from 'react';
import './ScrollProgressBar.css';

export function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const next = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
          if (fillRef.current) {
            fillRef.current.style.transform = `scaleX(${next})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
}

