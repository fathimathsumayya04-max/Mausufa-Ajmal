import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import './FloatingNav.css';

const NAV_ITEMS = [
  { href: '#hero', label: 'Invitation' },
  { href: '#verse', label: 'Verse' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#details', label: 'Details' },
  { href: '#location', label: 'Venue' },
  { href: '#dua', label: 'Dua' },
];

/**
 * Minimalist Luxury Wedding Menubar Icon
 */
function LovelyMenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="#FEF08A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 12h10" stroke="#FEF08A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 17h16" stroke="#FEF08A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Minimalist Luxury Close Icon
 */
function LovelyCloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M6 6l12 12" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 36);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`floating-nav ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="floating-nav__inner">
        <a
          href="#hero"
          className="floating-nav__brand"
          aria-label="Back to invitation top"
          onClick={() => setDrawerOpen(false)}
        >
          <span className="floating-nav__monogram">{weddingConfig.couple.monogram}</span>
        </a>

        <nav className="floating-nav__links" aria-label="Invitation Sections">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="floating-nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="floating-nav__actions">
          {/* Lovely Custom Mobile Menubar Button */}
          <button
            type="button"
            className={`floating-nav__burger ${drawerOpen ? 'is-open' : ''}`}
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {drawerOpen ? <LovelyCloseIcon /> : <LovelyMenuIcon />}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <nav className="floating-nav__drawer" aria-label="Mobile Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="floating-nav__drawer-link"
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
