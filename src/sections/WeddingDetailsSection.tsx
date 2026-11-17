import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import './WeddingDetailsSection.css';

export function WeddingDetailsSection() {
  const details = [
    {
      icon: Calendar,
      label: 'Nikkah Date',
      value: weddingConfig.event.displayDate,
      sub: weddingConfig.event.dateDdMmYyyy,
      isNumericValue: true,
      isNumericSub: true,
    },
    {
      icon: Clock,
      label: 'Nikkah Time',
      value: `${weddingConfig.event.nikkahTime} AM`,
      sub: 'Ceremony Timing',
      isNumericValue: true,
      isNumericSub: false,
    },
    {
      icon: MapPin,
      label: 'Venue',
      value: weddingConfig.event.venue,
      sub: weddingConfig.event.country,
      isNumericValue: false,
      isNumericSub: false,
    },
  ];

  return (
    <section id="details" className="section-shell section-shell--soft">
      <GoldenSparkles count={12} />

      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-label">EVENT DETAILS</span>
          <h2 className="section-heading">{weddingConfig.event.title}</h2>
          <OrnamentDivider tone="gold" width="sm" className="details-header-divider" />
          <p className="section-subtitle">{weddingConfig.event.invitationMessage}</p>
        </motion.div>

        <motion.div
          className="details-grid"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {details.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                className="ref-card detail-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
              >
                <div className="detail-card__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <p className="detail-card__label">{item.label}</p>
                <h3 className={`detail-card__value ${item.isNumericValue ? 'num-serif' : ''}`}>{item.value}</h3>
                <p className={`detail-card__sub ${item.isNumericSub ? 'num-serif' : ''}`}>{item.sub}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
