import { motion } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { weddingConfig } from '../config/weddingConfig';
import './FooterSection.css';

export function FooterSection() {
  return (
    <footer className="site-footer">
      <motion.div
        className="section-inner site-footer__inner"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <OrnamentDivider tone="gold" width="sm" className="site-footer__divider" />

        {/* Both Names in Sophisticated Serif Typography */}
        <h2 className="site-footer__couple">
          <span className="site-footer__name">{weddingConfig.couple.brideName}</span>
          <span className="site-footer__ampersand">&amp;</span>
          <span className="site-footer__name">{weddingConfig.couple.groomName}</span>
        </h2>

        <p className="site-footer__meta">
          <span className="num-serif">{weddingConfig.event.displayDate}</span> &middot;{' '}
          <span className="num-serif">{weddingConfig.event.nikkahTime} AM</span> &middot;{' '}
          {weddingConfig.event.venue}
        </p>

        <p className="site-footer__note">
          JazakAllahu Khayran for sharing in our joy and keeping us in your prayers and duas.
        </p>
      </motion.div>
    </footer>
  );
}
