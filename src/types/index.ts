export type Language = 'ru' | 'kg' | 'en';
export type ThemeMode = 'dark' | 'light';

export type CarCategory = 'sedan' | 'crossover' | 'suv' | 'premium';

export interface ServiceItem {
  id: string;
  category: 'tinting' | 'ppf' | 'vinyl' | 'detailing';
  titleKey: string;
  descriptionKey: string;
  priceSedan: number;
  priceCrossover: number;
  priceSuv: number;
  pricePremium: number;
  durationHours: number;
  warrantyYears: number;
  popular?: boolean;
  features: string[];
  filmBrands: string[];
  imageUrl: string;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  completedCars: number;
  specialty: string;
  avatarUrl: string;
  availableDays: string[];
}

export interface Booking {
  id: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  carBrand: string;
  carModel: string;
  carYear: number;
  carCategory: CarCategory;
  serviceId: string;
  serviceTitle: string;
  masterId: string;
  masterName: string;
  bookingDate: string;
  bookingTime: string;
  filmBrand: string;
  priceKgs: number;
  paymentMethod: 'mbank' | 'odengi' | 'optima' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'pay_on_site';
  status: 'pending' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
  telegramSent: boolean;
  notes?: string;
  tintPermitAssistance?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  carModel: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  verified: boolean;
  likes: number;
  masterName?: string;
}

export interface Promotion {
  id: string;
  badge: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validUntil: string;
  accentColor: string;
  serviceCategory?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'tint_permit' | 'ppf' | 'warranty' | 'care';
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: string;
  ip: string;
  status: 'success' | 'warning' | 'alert';
}

export interface HeroSlide {
  id: string;
  image: string;
  carTitle: string;
  filmBrand: string;
  tag: string;
  serviceId: string;
  carCategory: 'suv' | 'sedan' | 'crossover' | 'premium';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ppf' | 'tinting' | 'vinyl';
  film: string;
  timeSpent: string;
  car: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  type: 'image' | 'video' | 'carousel';
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  permalink: string;
  category: 'tinting' | 'ppf' | 'reels' | 'before_after';
  tags: string[];
}

