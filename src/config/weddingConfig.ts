export interface WeddingConfig {
  couple: {
    brideName: string;
    groomName: string;
    monogram: string;
    tagline: string;
  };
  event: {
    title: string;
    displayDate: string;
    dateDdMmYyyy: string;
    nikkahTime: string;
    isoDateStart: string;
    timezone: string;
    venue: string;
    country: string;
    invitationMessage: string;
  };
  bismillah: string;
  dua: {
    heading: string;
    arabic: string;
    translation: string;
    sourceNote: string;
  };
  quranVerse: {
    heading: string;
    arabic: string;
    reference: string;
    translation: string;
  };
  location: {
    heading: string;
    subtext: string;
    googleMapsDirectionsUrl: string;
    verifiedGoogleMapsEmbedUrl: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    brideName: 'Mausufa Shirin',
    groomName: 'Ajmal',
    monogram: 'M & A',
    tagline: 'Two souls, one beautiful journey.',
  },
  event: {
    title: 'The Wedding',
    displayDate: '03 DECEMBER 2026',
    dateDdMmYyyy: '03/12/2026',
    nikkahTime: '11:00',
    isoDateStart: '2026-12-03T11:00:00+05:30',
    timezone: 'Asia/Kolkata',
    venue: 'Karipaalam Community Hall',
    country: 'Kochi',
    invitationMessage:
      'With the blessings of Allah, we invite you to join us in celebrating this beautiful occasion.',
  },
  bismillah: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  dua: {
    heading: 'A DUA FOR THE COUPLE',
    arabic: 'بَارَكَ اللَّهُ لَكُمَا، وَبَارَكَ عَلَيْكُمَا، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    translation:
      'May Allah bless you both, shower His blessings upon you, and unite you both in goodness.',
    sourceNote: 'Prophetic Supplication for Marriage',
  },
  quranVerse: {
    heading: 'A SACRED REMINDER',
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    reference: 'Surah Ar-Rum — 30:21',
    translation:
      'And among His signs is that He created for you spouses from among yourselves so that you may find tranquillity in them, and He has placed between you affection and mercy. Indeed, in that are signs for people who reflect.',
  },
  location: {
    heading: 'Join Us At The Celebration',
    subtext:
      'Directions open via Google Maps for Karipaalam Community Hall. Please verify route details before departing.',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Karipaalam%20Community%20Hall',
    verifiedGoogleMapsEmbedUrl:
      'https://maps.google.com/maps?q=Karipaalam%20Community%20Hall&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  seo: {
    title: 'Mausufa Shirin & Ajmal — 03 December 2026 | Nikkah Invitation',
    description:
      'With the blessings of Allah, join Mausufa Shirin & Ajmal on 03 December 2026 at 11:00 at Karipaalam Community Hall.',
  },
};
