import { useEffect, useState } from 'react';
import { weddingAudio } from '../utils/audioManager';

export function useWeddingAudio() {
  const [audioState, setAudioState] = useState(weddingAudio.getState());

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  return {
    ...audioState,
    play: () => weddingAudio.resume(900),
    resume: (durationMs = 900) => weddingAudio.resume(durationMs),
    pause: () => weddingAudio.pause(true),
    toggle: () => weddingAudio.toggle(),
    startFromTapToOpen: () => weddingAudio.startFromTapToOpen(),
  };
}
