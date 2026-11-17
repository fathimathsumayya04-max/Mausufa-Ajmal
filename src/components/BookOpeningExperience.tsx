import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioManager';
import './BookOpeningExperience.css';

interface BookOpeningExperienceProps {
  onEnter: () => void;
}

type Stage = 'closed' | 'unsealing' | 'emerging' | 'centered' | 'unfolding' | 'revealed';

export const BookOpeningExperience: React.FC<BookOpeningExperienceProps> = ({ onEnter }) => {
  const [stage, setStage] = useState<Stage>('closed');
  const [isExiting, setIsExiting] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const hasTriggeredExitRef = useRef(false);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // Clean up all pending timeouts when unmounted
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Start the cinematic multi-step opening sequence
  const startOpening = useCallback(() => {
    if (stage !== 'closed') return;
    clearAllTimeouts();
    hasTriggeredExitRef.current = false;
    setIsExiting(false);

    // Start playing the uploaded wedding Nasheed smoothly strictly on direct user click!
    weddingAudio.startFromTapToOpen();

    // Step 1: Envelope flap opens 180° in 3D
    setStage('unsealing');

    // Step 2: Folded card emerges and slides out of pocket
    const timer1 = window.setTimeout(() => {
      setStage('emerging');
    }, 650);

    // Step 3: Card centers and scales up gracefully — full card reveal
    const timer2 = window.setTimeout(() => {
      setStage('centered');
    }, 1250);

    // Step 4: Card unfolds into two-page spread in 3D
    const timer3 = window.setTimeout(() => {
      setStage('unfolding');
    }, 1850);

    // Step 5: Fully revealed with celebration controls
    const timer4 = window.setTimeout(() => {
      setStage('revealed');
    }, 2550);

    timeoutsRef.current.push(timer1, timer2, timer3, timer4);
  }, [stage, clearAllTimeouts]);

  // Skip animation to immediately view the unfolded invitation
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAllTimeouts();
    weddingAudio.startFromTapToOpen();
    setStage('revealed');
  };

  // Replay the complete experience from the beginning
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasTriggeredExitRef.current = false;
    clearAllTimeouts();
    setIsExiting(false);
    setStage('closed');
  };

  // Enter the main wedding invitation website (supports both automatic timer and user click)
  const handleEnterWebsite = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (hasTriggeredExitRef.current) return;
    hasTriggeredExitRef.current = true;

    clearAllTimeouts();
    setIsExiting(true);

    // Ensure the main invitation is scrolled to the absolute top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Smooth fade exit matches CSS 0.75s opacity transition
    const exitTimer = window.setTimeout(() => {
      onEnter();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 750);
    timeoutsRef.current.push(exitTimer);
  }, [clearAllTimeouts, onEnter]);

  // AUTOMATIC TRANSITION: Keep fully opened book visible for exactly 2 seconds, then transition
  useEffect(() => {
    if (stage === 'revealed' && !isExiting && !hasTriggeredExitRef.current) {
      const autoEnterTimer = window.setTimeout(() => {
        handleEnterWebsite();
      }, 2000);
      timeoutsRef.current.push(autoEnterTimer);

      return () => {
        window.clearTimeout(autoEnterTimer);
      };
    }
  }, [stage, isExiting, handleEnterWebsite]);

  return (
    <div
      className={`opening-experience ${stage} ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Interactive Wedding Invitation Opening Experience"
    >
      {/* Ambient background atmosphere */}
      <div className="opening-ambient-glow" aria-hidden="true" />

      {/* Top Header Controls (Skip Button) */}
      <div className="opening-top-bar">
        <div className="top-brand-monogram">M &amp; A</div>
        <div className="top-actions">
          {stage !== 'revealed' && (
            <button
              type="button"
              className="top-btn top-btn--skip"
              onClick={handleSkip}
              aria-label="Skip opening animation"
            >
              SKIP ANIMATION
            </button>
          )}
        </div>
      </div>

      {/* Section Header Text matching Reference Video */}
      <div className={`opening-header-text ${stage === 'revealed' ? 'is-compact' : ''}`}>
        <p className="opening-eyebrow">A BEAUTIFUL CELEBRATION AWAITS</p>
        <h1 className="opening-title">YOU ARE CORDIALLY INVITED</h1>
      </div>

      {/* Main 3D Stage */}
      <div className="opening-stage">
        {/* =================================================================
            1. THE EMBOSSED IVORY / CREAM ENVELOPE
            ================================================================= */}
        <div
          className={`invitation-envelope ${stage !== 'closed' ? 'is-opened' : ''}`}
          onClick={stage === 'closed' ? startOpening : undefined}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && stage === 'closed') {
              e.preventDefault();
              startOpening();
            }
          }}
          role={stage === 'closed' ? 'button' : undefined}
          tabIndex={stage === 'closed' ? 0 : undefined}
          aria-label={stage === 'closed' ? 'Click to open the wedding invitation envelope' : undefined}
        >
          {/* Envelope Back Wall & Golden Interior Cavity */}
          <div className="envelope-back-wall">
            <div className="envelope-interior-gold" />
          </div>

          {/* ===============================================================
              2. THE FOLDED CARD (Emerges & Unfolds into Two Pages)
              =============================================================== */}
          <div className={`invitation-card-unit ${stage}`}>
            {/* The Unfolded Two-Page Booklet (Visible when unfolding / revealed) */}
            <div className="two-page-booklet">
              {/* LEFT PAGE: Deep Burgundy with Gold Crest & Monogram */}
              <div className="booklet-page booklet-page--left">
                <div className="page-left-content">
                  <div className="page-left-border-arch">
                    <div className="page-left-monogram-ring" aria-label="M & A Monogram">
                      <img
                        src="/images/opening/interlocking-ma-monogram-gold.png"
                        alt="Interlocking M & A Luxury Monogram"
                        className="page-left-interlocking-monogram"
                      />
                    </div>
                    <div className="page-left-rule" />
                    <p className="page-left-tagline">
                      &ldquo;{weddingConfig.couple.tagline}&rdquo;
                    </p>
                    <p className="page-left-date num-serif">03 &middot; 12 &middot; 2026</p>
                  </div>
                </div>
              </div>

              {/* RIGHT PAGE: Luxury Traditional Islamic Floral Wedding Invitation (Matched to Reference Image) */}
              <div className="booklet-page booklet-page--right">
                <div
                  className="page-right-art-container"
                  role="article"
                  aria-label="Islamic Floral Wedding Invitation: Bismillah; Surah Ar-Rum 30:21; Ajmal & Mausufa Shirin; 03 December 2026, India; Prophetic Wedding Supplication"
                >
                  <img
                    src="/images/opening/islamic-floral-invitation-page.png"
                    alt="Traditional Islamic Floral Wedding Invitation for Mausufa Shirin & Ajmal"
                    className="page-right-art-img"
                    loading="eager"
                  />
                  <div className="page-right-art-overlay" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Folded Cover Face (Visible during closed / emerging stage) */}
            <div className="folded-card-cover">
              <div className="folded-cover-inner">
                <div className="folded-cover-monogram">M &amp; A</div>
                <div className="folded-cover-divider" />
                <p className="folded-cover-date num-serif">03 DECEMBER 2026</p>
              </div>
            </div>
          </div>

          {/* Front Pocket of the Envelope (holds the card inside) */}
          <div className="envelope-pocket">
            <svg
              viewBox="0 0 360 400"
              className="envelope-pocket-svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Warm Ivory / Soft Creamy Champagne Envelope Folds */}
                <linearGradient id="pocketFolds" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbf6eb" />
                  <stop offset="45%" stopColor="#f4ebdb" />
                  <stop offset="80%" stopColor="#ecdfcb" />
                  <stop offset="100%" stopColor="#e2d2bb" />
                </linearGradient>
                <linearGradient id="pocketSideFolds" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8f2e4" />
                  <stop offset="60%" stopColor="#efe5d2" />
                  <stop offset="100%" stopColor="#e5d7c2" />
                </linearGradient>
                <filter id="pocketDepth" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="6" floodColor="#380d16" floodOpacity="0.18" />
                </filter>

                {/* Seamless Luxury Handmade Paper Texture Pattern */}
                <pattern id="pocketPaperTexture" width="180" height="180" patternUnits="userSpaceOnUse">
                  <image href="/images/opening/luxury-paper-texture.png" width="180" height="180" preserveAspectRatio="none" />
                </pattern>
              </defs>
              {/* Left and Right Triangular Folds (Base Folds + Visible Luxury Paper Texture) */}
              <polygon points="0,0 0,400 180,225" fill="url(#pocketSideFolds)" />
              <polygon points="0,0 0,400 180,225" fill="url(#pocketPaperTexture)" opacity="0.72" style={{ mixBlendMode: 'multiply' }} />

              <polygon points="360,0 360,400 180,225" fill="url(#pocketSideFolds)" />
              <polygon points="360,0 360,400 180,225" fill="url(#pocketPaperTexture)" opacity="0.72" style={{ mixBlendMode: 'multiply' }} />

              {/* Bottom Overlapping Triangle (Base Fold + Visible Luxury Paper Texture) */}
              <polygon points="0,400 360,400 180,195" fill="url(#pocketFolds)" filter="url(#pocketDepth)" />
              <polygon points="0,400 360,400 180,195" fill="url(#pocketPaperTexture)" opacity="0.72" style={{ mixBlendMode: 'multiply' }} />

              {/* Delicate Gold Seam Lines */}
              <polyline
                points="0,400 180,195 360,400"
                stroke="rgba(212, 175, 55, 0.65)"
                strokeWidth="1.3"
                fill="none"
              />
            </svg>

            {/* Subtle Luxury Handmade Paper Texture Overlay */}
            <div className="envelope-paper-texture" aria-hidden="true" />
          </div>

          {/* Envelope Top Flap (Hinged at top, rotates 180deg upward in 3D) */}
          <div className="envelope-top-flap">
            {/* Front of Flap with Gold Wax Seal (pointing down when closed) */}
            <div className="flap-face flap-front">
              <svg
                viewBox="0 0 360 215"
                className="flap-front-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Warm Ivory / Cream Champagne Flap Gradient */}
                  <linearGradient id="flapCreamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#fcf7ec" />
                    <stop offset="50%" stopColor="#f7efe0" />
                    <stop offset="80%" stopColor="#ede1cc" />
                    <stop offset="100%" stopColor="#e3d3bc" />
                  </linearGradient>
                  <filter id="flapShadow" x="-10%" y="0%" width="120%" height="135%">
                    <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#380d16" floodOpacity="0.25" />
                  </filter>

                  {/* Seamless Luxury Handmade Paper Texture Pattern for Flap */}
                  <pattern id="flapPaperTexture" width="180" height="180" patternUnits="userSpaceOnUse">
                    <image href="/images/opening/luxury-paper-texture.png" width="180" height="180" preserveAspectRatio="none" />
                  </pattern>
                </defs>
                <polygon
                  points="0,0 360,0 180,210"
                  fill="url(#flapCreamGrad)"
                  filter="url(#flapShadow)"
                />
                <polygon
                  points="0,0 360,0 180,210"
                  fill="url(#flapPaperTexture)"
                  opacity="0.72"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <polyline
                  points="0,0 180,210 360,0"
                  stroke="rgba(212, 175, 55, 0.7)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              {/* Subtle Luxury Paper Texture Overlay on Flap */}
              <div className="envelope-flap-texture" aria-hidden="true" />

              {/* Realistic Golden Wax Seal with Interlocking Monogram */}
              <div className="golden-wax-seal" aria-hidden="true">
                <div className="wax-seal-outer">
                  <div className="wax-seal-inner">
                    <img
                      src="/images/opening/interlocking-ma-monogram-seal.png"
                      alt="Interlocking M & A Wax Seal Monogram"
                      className="wax-seal-monogram-img"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Flap (visible when folded open upward) */}
            <div className="flap-face flap-back">
              <svg
                viewBox="0 0 360 215"
                className="flap-back-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="flapBackGold" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#c89d2d" />
                    <stop offset="50%" stopColor="#dfa836" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                </defs>
                <polygon points="0,215 360,215 180,5" fill="url(#flapBackGold)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Soft Ground Shadow beneath Envelope */}
        <div className="envelope-ground-shadow" aria-hidden="true" />
      </div>

      {/* =================================================================
          BOTTOM CONTROLS & STATUS TEXT
          ================================================================= */}
      <div className="opening-bottom-controls">
        {/* Stage 0: Tap to open button */}
        {stage === 'closed' && (
          <button
            type="button"
            className="btn-tap-to-open"
            onClick={startOpening}
            aria-label="Tap to open invitation envelope"
          >
            <Sparkles size={15} aria-hidden="true" />
            <span>TAP TO OPEN</span>
          </button>
        )}

        {/* Stages 1, 2 & 3: Status Text & Progress Cue */}
        {(stage === 'unsealing' || stage === 'emerging' || stage === 'centered') && (
          <div className="opening-status-bar">
            <span className="status-pulse-dot" />
            <span className="status-text">
              {stage === 'unsealing'
                ? 'Unsealing your invitation...'
                : stage === 'emerging'
                ? 'Opening your invitation...'
                : 'Revealing your invitation...'}
            </span>
          </div>
        )}

        {/* Stages 3 & 4: Enter Celebration & Replay Actions */}
        {(stage === 'unfolding' || stage === 'revealed') && (
          <div className={`action-button-row ${stage === 'revealed' ? 'is-visible' : ''}`}>
            <button
              type="button"
              className="btn-enter-celebration"
              onClick={handleEnterWebsite}
              aria-label="Enter the main wedding invitation celebration"
            >
              <span>ENTER CELEBRATION</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="btn-replay-action"
              onClick={handleReplay}
              aria-label="Replay invitation opening"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>REPLAY INVITATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
