import { useEffect, useState } from 'react';

export type CountdownStatus = 'upcoming' | 'wedding-day' | 'completed';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: CountdownStatus;
}

const TARGET_DATE_KEY = '2026-12-03';

function getDateKeyInTimezone(date: Date, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function calculateCountdown(targetIso: string, timeZone: string): CountdownState {
  const now = new Date();
  const targetMs = Date.parse(targetIso);
  const currentDateKey = getDateKeyInTimezone(now, timeZone);

  if (currentDateKey === TARGET_DATE_KEY) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'wedding-day' };
  }

  if (Number.isNaN(targetMs) || now.getTime() >= targetMs || currentDateKey > TARGET_DATE_KEY) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'completed' };
  }

  const diffSeconds = Math.max(0, Math.floor((targetMs - now.getTime()) / 1000));
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    status: 'upcoming',
  };
}

export function useCountdown(targetIso: string, timeZone: string): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(targetIso, timeZone)
  );

  useEffect(() => {
    setCountdown(calculateCountdown(targetIso, timeZone));
    const intervalId = window.setInterval(() => {
      setCountdown(calculateCountdown(targetIso, timeZone));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetIso, timeZone]);

  return countdown;
}

