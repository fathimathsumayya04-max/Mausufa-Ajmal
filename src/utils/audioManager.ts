/**
 * High-Performance Singleton HTML5 Audio Controller
 * Dedicated for Wedding Nasheed Background Music
 *
 * Requirements:
 * - Silent on initial load & closed envelope screen.
 * - Starts automatically when visitor opens the card ("TAP TO OPEN").
 * - Begins with very low volume and smoothly fades in over 4–5 seconds.
 * - Gentle, comfortable, consistent volume after fade-in.
 * - Clean speaker/volume icon: sound waves when playing, muted speaker when paused.
 * - Zero text or labels.
 * - Tapping pauses; tapping again resumes smoothly without sudden volume jumps.
 * - Preserves playback position when toggling sound (does not restart).
 * - Pauses immediately when user navigates away or presses browser Back.
 * - Exactly ONE audio instance (singleton) to prevent duplicate audio or leaks.
 */

type AudioStateListener = (state: { isPlaying: boolean; hasStarted: boolean; isUserPaused: boolean }) => void;

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private hasStarted = false;
  private isUserPaused = false;
  private listeners: Set<AudioStateListener> = new Set();
  private maxVolume = 0.72; // Comfortable, consistent listening volume
  private fadeAnimationId: number | null = null;
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalListeners();
    }
  }

  private getAudioInstance(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.loop = true;

      // 100% compliant MP3 extracted via FFmpeg from uploaded video
      this.audio.src = '/audio/wedding-nasheed.mp3';

      try {
        this.audio.volume = 0.04;
      } catch {
        // Read-only on some mobile browsers (e.g. iOS)
      }

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        if (!this.isUserPaused && this.audio) {
          this.audio.currentTime = 0;
          this.audio.play().catch(() => {});
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio notice on MP3, loading fallback M4A:', e);
        if (this.audio && !this.audio.src.endsWith('wedding-nasheed.m4a')) {
          this.audio.src = '/audio/wedding-nasheed.m4a';
          if (this.hasStarted && !this.isUserPaused) {
            this.audio.play().catch(() => {});
          }
        }
      });
    }
    return this.audio;
  }

  private setupGlobalListeners() {
    if (this.initialized) return;
    this.initialized = true;

    // 1. Back button & SPA navigation: pause immediately
    window.addEventListener('popstate', () => {
      this.pause(false);
    });

    // 2. Page unload / navigation away: pause immediately
    window.addEventListener('pagehide', () => {
      this.pause(false);
    });

    window.addEventListener('beforeunload', () => {
      this.pause(false);
    });

    // 3. Tab switch / screen lock / minimize
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.audio && !this.audio.paused) {
          this.audio.pause();
        }
      } else {
        // Return to page: only resume if visitor hadn't manually paused
        if (this.hasStarted && !this.isUserPaused) {
          this.resume(800);
        }
      }
    });
  }

  /**
   * Smoothly fades volume in over durationMs using requestAnimationFrame
   */
  private runFadeIn(durationMs: number, startVol: number, targetVol: number): void {
    const a = this.getAudioInstance();

    if (this.fadeAnimationId !== null) {
      cancelAnimationFrame(this.fadeAnimationId);
      this.fadeAnimationId = null;
    }

    try {
      a.volume = startVol;
    } catch {}

    const playPromise = a.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();

          const startTime = performance.now();
          const step = (now: number) => {
            if (!this.audio || !this.isPlaying) {
              this.fadeAnimationId = null;
              return;
            }

            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            // Smooth ease curve: avoids sudden jumps
            const currentVol = startVol + (targetVol - startVol) * progress;

            try {
              this.audio.volume = Math.min(targetVol, Math.max(startVol, currentVol));
            } catch {}

            if (progress < 1) {
              this.fadeAnimationId = requestAnimationFrame(step);
            } else {
              try {
                this.audio.volume = targetVol;
              } catch {}
              this.fadeAnimationId = null;
            }
          };

          this.fadeAnimationId = requestAnimationFrame(step);
        })
        .catch((err) => {
          console.warn('Audio playback notice:', err);
        });
    }
  }

  /**
   * Called strictly when the visitor opens the invitation card ("TAP TO OPEN")
   * Starts with very low volume and fades in smoothly over 4.5 seconds
   */
  public startFromTapToOpen(): void {
    this.hasStarted = true;
    this.isUserPaused = false;
    const a = this.getAudioInstance();
    a.currentTime = 0; // Starts from beginning on first open
    // 4.5 second smooth fade-in from 0.04 to 0.72
    this.runFadeIn(4500, 0.04, this.maxVolume);
  }

  /**
   * Resumes playback smoothly from current position without restarting song
   */
  public resume(durationMs = 900): void {
    this.isUserPaused = false;
    this.hasStarted = true;
    // Smooth 900ms transition to avoid sudden volume jump
    this.runFadeIn(durationMs, 0.12, this.maxVolume);
  }

  /**
   * Pauses playback preserving current timestamp
   */
  public pause(userTriggered = true): void {
    if (userTriggered) {
      this.isUserPaused = true;
    }
    if (this.fadeAnimationId !== null) {
      cancelAnimationFrame(this.fadeAnimationId);
      this.fadeAnimationId = null;
    }
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  /**
   * Toggles sound: pauses if playing; smoothly resumes from current position if paused
   */
  public toggle(): void {
    if (this.isPlaying) {
      this.pause(true);
    } else {
      this.resume(900);
    }
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      hasStarted: this.hasStarted,
      isUserPaused: this.isUserPaused,
    };
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }
}

export const weddingAudio = new WeddingAudioManager();
