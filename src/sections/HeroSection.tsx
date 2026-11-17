import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import './HeroSection.css';

interface HeroSectionProps {
  onViewInvitation?: () => void;
}

export function HeroSection({ onViewInvitation }: HeroSectionProps) {
  const handleCtaClick = () => {
    onViewInvitation?.();
    const target = document.getElementById('verse');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-radial-glow" aria-hidden="true" />
      <GoldenSparkles count={16} />

      <motion.div
        className="hero-invitation-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Arabic Bismillah Calligraphy in Authentic Horizontal Gold Foil (Matched to Reference) */}
        <div className="hero-card-bismillah-wrap" aria-label="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ">
          <img
            src="/images/bismillah-horizontal-gold.png"
            alt="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            className="hero-card-bismillah-img"
            loading="eager"
          />
        </div>

        {/* Eyebrow in classic tracked serif */}
        <p className="hero-card-eyebrow">TOGETHER WITH THEIR FAMILIES</p>

        {/* Bride and Groom Names in Sophisticated Cursive Script */}
        <h1 className="hero-card-names">
          <span className="hero-card-name">{weddingConfig.couple.brideName}</span>
          <span className="hero-card-ampersand" aria-hidden="true">&amp;</span>
          <span className="hero-card-name">{weddingConfig.couple.groomName}</span>
        </h1>

        {/* Invitation Line */}
        <div className="hero-card-invitation">
          <p>REQUEST THE HONOUR OF YOUR PRESENCE</p>
          <p>AT THEIR WEDDING CEREMONY</p>
        </div>

        {/* Signature Luxury Invitation Card Date Block */}
        <div className="hero-card-date-block" aria-label="Nikkah date and time">
          <span className="hero-card-day">THURSDAY</span>
          <div className="hero-card-date-divider-row">
            <span className="hero-card-rule" aria-hidden="true" />
            <span className="hero-card-date-number num-serif">03</span>
            <span className="hero-card-rule" aria-hidden="true" />
          </div>
          <div className="hero-card-date-sub">
            <span>DECEMBER</span>
            <span className="hero-card-year num-serif">2026</span>
          </div>
        </div>

        {/* Event Schedule & Venue Details */}
        <div className="hero-card-details">
          <p className="hero-card-time">
            NIKKAH AT <span className="hero-card-time-num num-serif">{weddingConfig.event.nikkahTime}</span> AM
          </p>
          <p className="hero-card-venue">{weddingConfig.event.venue.toUpperCase()}</p>
          <p className="hero-card-country">KOCHI</p>
          <p className="hero-card-reception">RECEPTION TO FOLLOW</p>
        </div>
      </motion.div>

      {/* Action CTA & Scroll Indicator */}
      <motion.div
        className="hero-cta-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <button
          type="button"
          className="btn-teal hero-cta-btn"
          onClick={handleCtaClick}
        >
          <span>View Full Invitation</span>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </motion.div>

      <a href="#verse" className="hero-scroll-cue" aria-label="Scroll to Sacred Reminder">
        <span>SCROLL TO CELEBRATE</span>
        <ChevronDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
