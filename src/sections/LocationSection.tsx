import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, MapPin, Navigation, Sparkles } from 'lucide-react';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import './LocationSection.css';

export function LocationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const addressText = `${weddingConfig.event.venue}, ${weddingConfig.event.country}`;
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = addressText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="location" className="section-shell section-shell--white">
      <GoldenSparkles count={16} />

      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-label">VENUE</span>
          <h2 className="section-heading">{weddingConfig.location.heading}</h2>
          <OrnamentDivider tone="gold" width="sm" className="location-divider" />
          <p className="section-subtitle">{weddingConfig.location.subtext}</p>
        </motion.div>

        <motion.div
          className="venue-showcase"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ref-card venue-card">
            <div className="venue-card__header">
              <div className="venue-card__badge" aria-hidden="true">
                <MapPin size={24} strokeWidth={1.9} />
              </div>

              <span className="venue-card__eyebrow">CEREMONY &amp; RECEPTION VENUE</span>
              <h3 className="venue-card__title">{weddingConfig.event.venue}</h3>
              <p className="venue-card__sub">{weddingConfig.event.country}</p>

              <div className="venue-card__meta-pill">
                <span className="num-serif">{weddingConfig.event.displayDate}</span>
                <span className="venue-meta-dot" aria-hidden="true">•</span>
                <span className="num-serif">{weddingConfig.event.nikkahTime} AM</span>
              </div>

              {/* Luxury Amenities Row */}
              <div className="venue-amenities-row" aria-label="Venue Highlights">
                <span className="venue-amenity-chip">
                  <Sparkles size={12} aria-hidden="true" />
                  Guest Parking
                </span>
                <span className="venue-amenity-chip">
                  <Sparkles size={12} aria-hidden="true" />
                  Banquet Dining
                </span>
                <span className="venue-amenity-chip">
                  <Sparkles size={12} aria-hidden="true" />
                  Air-Cooled Hall
                </span>
              </div>
            </div>

            {/* Real Interactive Live Google Map */}
            <div className="venue-map-frame">
              <iframe
                src={weddingConfig.location.verifiedGoogleMapsEmbedUrl}
                title={`Interactive Map of ${weddingConfig.event.venue}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="venue-map-iframe"
              />
            </div>

            {/* Small-Sized Refined Mobile Action Buttons */}
            <div className="venue-card__actions">
              <a
                href={weddingConfig.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-teal venue-action-btn venue-action-btn--primary"
              >
                <Navigation size={14} aria-hidden="true" />
                Directions
                <ExternalLink size={12} aria-hidden="true" />
              </a>

              <button
                type="button"
                className="btn-teal-outline venue-action-btn venue-action-btn--secondary"
                onClick={handleCopyAddress}
              >
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy Address'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
