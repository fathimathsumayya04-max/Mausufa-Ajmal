import { Volume2, VolumeX } from 'lucide-react';
import { useWeddingAudio } from '../hooks/useWeddingAudio';
import './MusicToggleButton.css';

interface MusicToggleButtonProps {
  className?: string;
}

/**
 * Minimalist luxury Sound / Volume Toggle Button
 * Pure icon only (Volume2 when playing, VolumeX when muted/paused)
 * Zero text, zero labels. Fixed neatly at the side of the screen.
 */
export function MusicToggleButton({ className = '' }: MusicToggleButtonProps) {
  const { isPlaying, toggle, hasStarted } = useWeddingAudio();

  // Hidden on initial load & closed envelope; appears once card is opened
  if (!hasStarted) {
    return null;
  }

  return (
    <div className={`floating-music-btn-wrap ${className}`}>
      <button
        type="button"
        className={`music-circle-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        aria-label={isPlaying ? 'Mute wedding Nasheed audio' : 'Play wedding Nasheed audio'}
        title={isPlaying ? 'Mute Sound' : 'Play Sound'}
      >
        {isPlaying ? (
          <Volume2 className="sound-icon" size={20} strokeWidth={2} aria-hidden="true" />
        ) : (
          <VolumeX className="sound-icon" size={20} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
