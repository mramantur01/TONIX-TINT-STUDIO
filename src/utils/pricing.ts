// Prices and promo codes come from the services and promotions edited in the admin panel.
import type { CarCategory, Promotion, ServiceItem } from '../types';

export const servicePrice = (service: ServiceItem, category: CarCategory): number =>
  ({
    sedan: service.priceSedan,
    crossover: service.priceCrossover,
    suv: service.priceSuv,
    premium: service.pricePremium,
  })[category];

export const findPromotion = (promotions: Promotion[], code: string | null | undefined): Promotion | null => {
  const wanted = (code || '').trim().toUpperCase();
  if (!wanted) return null;
  return promotions.find(p => (p.code || '').trim().toUpperCase() === wanted) || null;
};

// A promotion tied to a category (e.g. 'ppf') only discounts services of that category.
export const promoAppliesTo = (promo: Promotion, service: ServiceItem) =>
  !promo.serviceCategory || promo.serviceCategory === service.category;

export const discountedPrice = (service: ServiceItem, category: CarCategory, promo: Promotion | null): number => {
  const base = servicePrice(service, category);
  return promo && promoAppliesTo(promo, service) ? Math.round(base * (1 - promo.discountPercent / 100)) : base;
};

export const PROMO_CATEGORY_LABELS: Record<string, string> = {
  tinting: 'тонировку',
  ppf: 'бронепленку',
  vinyl: 'винил',
  detailing: 'полировку и керамику',
};
