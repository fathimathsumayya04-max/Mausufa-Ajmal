import { motion } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import './DuaSection.css';

export function DuaSection() {
  return (
    <section id="dua" className="section-shell section-shell--teal">
      <GoldenSparkles count={12} />

      <div className="section-inner">
        <motion.div
          className="dua-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-label eyebrow-label--light">
            {weddingConfig.dua.heading}
          </span>

          <p className="arabic-text dua-wrap__arabic" lang="ar" dir="rtl">
            {weddingConfig.dua.arabic}
          </p>

          <OrnamentDivider tone="gold" width="md" className="dua-wrap__divider" />

          <p className="dua-wrap__translation">{weddingConfig.dua.translation}</p>

          <p className="dua-wrap__ameen">Ameen &mdash; {weddingConfig.dua.sourceNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
