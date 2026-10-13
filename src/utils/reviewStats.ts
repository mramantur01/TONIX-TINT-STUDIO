// Rating and review count shown on the site are computed from the reviews actually published.
import type { Language, Review } from '../types';

export function reviewStats(reviews: Review[]) {
  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  return { count, average: count ? average.toFixed(1) : '—' };
}

export function reviewsCountLabel(language: Language, count: number): string {
  if (language === 'en') return `${count} ${count === 1 ? 'review' : 'reviews'}`;
  if (language === 'kg') return `${count} пикир`;
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? 'отзыв'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 'отзыва'
        : 'отзывов';
  return `${count} ${word}`;
}
