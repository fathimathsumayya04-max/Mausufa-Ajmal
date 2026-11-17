import { motion } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { weddingConfig } from '../config/weddingConfig';
import './QuranVerseSection.css';

export function QuranVerseSection() {
  return (
    <section id="verse" className="section-shell section-shell--soft">
      <GoldenSparkles count={12} />

      <div className="section-inner">
        <motion.article
          className="ref-card verse-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-label">{weddingConfig.quranVerse.heading}</span>

          <p className="arabic-text verse-card__arabic" lang="ar" dir="rtl">
            {weddingConfig.quranVerse.arabic}
          </p>

          <OrnamentDivider tone="gold" width="md" className="verse-card__divider" />

          <blockquote className="verse-card__translation">
            &ldquo;{weddingConfig.quranVerse.translation}&rdquo;
          </blockquote>

          <p className="verse-card__reference">
            {weddingConfig.quranVerse.reference.includes('—') ? (
              <>
                {weddingConfig.quranVerse.reference.split('—')[0]} &mdash;{' '}
                <span className="num-serif">
                  {weddingConfig.quranVerse.reference.split('—')[1]?.trim()}
                </span>
              </>
            ) : (
              weddingConfig.quranVerse.reference
            )}
          </p>
        </motion.article>
      </div>
    </section>
  );
}
