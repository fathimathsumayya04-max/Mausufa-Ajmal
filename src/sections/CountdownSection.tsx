import { motion } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import { useCountdown } from '../hooks/useCountdown';
import './CountdownSection.css';

export function CountdownSection() {
  const { days, hours, minutes, seconds, status } = useCountdown(
    weddingConfig.event.isoDateStart,
    weddingConfig.event.timezone
  );

  const units = [
    { label: 'Days', shortLabel: 'Days', value: days },
    { label: 'Hours', shortLabel: 'Hours', value: hours },
    { label: 'Minutes', shortLabel: 'Mins', value: minutes },
    { label: 'Seconds', shortLabel: 'Sec', value: seconds },
  ];

  return (
    <section id="countdown" className="section-shell section-shell--white">
      <GoldenSparkles count={16} />

      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-label">THE CELEBRATION BEGINS IN</span>
          <h2 className="section-heading">Counting Every Blessed Moment</h2>
          <OrnamentDivider tone="gold" width="sm" className="countdown-header-divider" />
          <p className="section-subtitle">
            <span className="num-serif">{weddingConfig.event.displayDate}</span> &middot;{' '}
            <span className="num-serif">{weddingConfig.event.nikkahTime} AM</span>
          </p>
        </motion.div>

        {status === 'wedding-day' ? (
          <motion.div
            className="ref-card countdown-banner"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <OrnamentDivider tone="gold" width="sm" />
            <h3>Today Is The Blessed Day</h3>
            <p>
              Alhamdulillah &mdash; join us at {weddingConfig.event.venue} at{' '}
              {weddingConfig.event.nikkahTime} to celebrate {weddingConfig.couple.brideName} &amp;{' '}
              {weddingConfig.couple.groomName}.
            </p>
          </motion.div>
        ) : status === 'completed' ? (
          <motion.div
            className="ref-card countdown-banner"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <OrnamentDivider tone="gold" width="sm" />
            <h3>Joined In Eternal Blessing</h3>
            <p>
              Thank you for keeping {weddingConfig.couple.brideName} &amp;{' '}
              {weddingConfig.couple.groomName} in your prayers.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="countdown-grid"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Countdown to the Nikkah"
          >
            {units.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="ref-card countdown-tile"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="countdown-tile__glow" aria-hidden="true" />
                <span className="countdown-tile__value num-serif">
                  {String(unit.value).padStart(2, '0')}
                </span>
                {/* Desktop Full Label */}
                <span className="countdown-tile__label countdown-tile__label--desktop">
                  {unit.label === 'Seconds' ? 'Sec' : unit.label}
                </span>
                {/* Mobile Compact Label */}
                <span className="countdown-tile__label countdown-tile__label--mobile">
                  {unit.shortLabel}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
