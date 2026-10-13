import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Calculator, 
  Star, 
  CheckCircle2, 
  MapPin, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Sparkles,
  MoveHorizontal,
  Instagram
} from 'lucide-react';
import { TonixLogo } from './TonixLogo';
import { getInstagramUrl, getInstagramUsername, getWhatsappUrl } from '../utils/socialUtils';
import { reviewStats, reviewsCountLabel } from '../utils/reviewStats';

interface HeroSlide {
  id: string;
  image: string;
  carTitle: string;
  filmBrand: string;
  tag: string;
  serviceId: string;
  carCategory: 'suv' | 'sedan' | 'crossover' | 'premium';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=85',
    carTitle: 'Lexus LX 600 • Бронирование PPF & Тонировка 5%',
    filmBrand: 'STEK DYNOshield + LLumar ATR 5%',
    tag: 'Премиум бронезащита',
    serviceId: 'ppf-risk-zones',
    carCategory: 'suv'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=85',
    carTitle: 'BMW M5 • Атермальная пленка & Антихром',
    filmBrand: 'LLumar AIR 80 + Avery Gloss Black',
    tag: 'Спорт седан • Shadow Line',
    serviceId: 'dechrome-shadow',
    carCategory: 'sedan'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=85',
    carTitle: 'Zeekr 001 • Полная оклейка кузова полиуретаном',
    filmBrand: 'STEK DYNOshield Top-Coat 215 mkm',
    tag: 'Электрокар • 10 лет гарантии',
    serviceId: 'ppf-full-body',
    carCategory: 'premium'
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=85',
    carTitle: 'Mercedes G63 AMG • Черный матовый сатин',
    filmBrand: '3M 2080 Satin Deep Black Wrap',
    tag: 'Виниловый стайлинг',
    serviceId: 'vinyl-full-wrap',
    carCategory: 'suv'
  },
  {
    id: 'slide-5',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85',
    carTitle: 'Porsche Taycan • Тонировка по ГОСТу КР & 9H',
    filmBrand: 'LLumar CTX Ceramic + Ceramic Pro 9H',
    tag: 'Детейлинг • Защита от УФ',
    serviceId: 'tint-rear',
    carCategory: 'premium'
  }
];

export const Hero: React.FC = () => {
  const { t, language, reviews, setIsBookingOpen, openBookingWithPreselect, heroSlides, studioSettings, updateStudioSettings, isAdminAuthed } = useApp();
  const rating = reviewStats(reviews);
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Text position can be controlled from studioSettings or locally
  const textPosition = studioSettings.heroTextPosition || 'left';

  // Slideshow interval: fast and smooth (default 1800ms as requested)
  const slideInterval = (studioSettings.heroSlideInterval && studioSettings.heroSlideInterval <= 2000) 
    ? studioSettings.heroSlideInterval 
    : 1800;

  useEffect(() => {
    if (!isAutoPlay || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length, slideInterval]);

  // Keep current slide within bounds if slides list changed
  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const toggleTextPosition = () => {
    const next = textPosition === 'left' ? 'right' : 'left';
    updateStudioSettings({ heroTextPosition: next });
  };

  const active = slides[currentSlide] || slides[0];

  return (
    <section 
      className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* 1. Full-Bleed Clear Background Slideshow (Low tint so car photos are completely visible) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.carTitle}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Lightweight translucent overlays - preserves full brightness and clarity of the car */}
        <div className="photo-overlay absolute inset-0 bg-slate-900/20 pointer-events-none" />
        <div className="photo-overlay absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-slate-900/30 pointer-events-none" />
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10 w-full">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 ${
          textPosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          
          {/* Compact Glassmorphism Text Card (Does not block the car!) */}
          <div className="w-full max-w-xl lg:max-w-lg bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-700/60 shadow-2xl space-y-3.5 glow-amber">
            
            {/* Top Row: Official Emblem, Location Badge & Position Toggle */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <TonixLogo size={40} />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-[11px] font-bold min-w-0">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{studioSettings.address}</span>
                </div>
              </div>

              {/* Position Switcher: Left / Right — an admin layout setting, only matters on wide screens */}
              {isAdminAuthed && (
                <button
                  type="button"
                  onClick={toggleTextPosition}
                  className="hidden lg:inline-flex shrink-0 items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-amber-500/50 text-[10px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Переключить положение блока: Слева / Справа"
                >
                  <MoveHorizontal className="w-3 h-3 text-amber-400" />
                  <span>{textPosition === 'left' ? 'Слева' : 'Справа'}</span>
                </button>
              )}
            </div>

            {/* Compact Headline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white">
              {t.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                {t.heroTitleHighlight}
              </span>{' '}
              {t.heroTitle2}
            </h1>

            {/* Short Subtitle */}
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {t.heroSubtitle}
            </p>

            {/* 4 Compact Benefits */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-200">
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{t.heroFeature1}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{t.heroFeature2}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{t.heroFeature3}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{t.heroFeature4}</span>
              </div>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-md shadow-amber-500/30 transition-all cursor-pointer"
              >
                <span>{t.heroCtaBook}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#calculator"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Калькулятор</span>
              </a>

              <a
                href={getWhatsappUrl(studioSettings.whatsapp, 'Здравствуйте! Хочу получить консультацию по тонировке и оклейке авто в TONIX TINT STUDIO')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/40 text-xs font-semibold transition-all"
                title="WhatsApp Арген"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getInstagramUrl(studioSettings.instagram)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-pink-600/25 via-rose-600/25 to-purple-600/25 border border-pink-500/40 hover:border-pink-400 text-pink-300 hover:text-white text-xs font-semibold transition-all shadow-sm shadow-pink-500/20"
                title={`Instagram ${getInstagramUsername(studioSettings.instagram)}`}
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Compact Trust Stats */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center">
              <div>
                <div className="text-sm font-extrabold text-amber-400">4 850+</div>
                <div className="text-[10px] text-slate-400">{t.heroStatCars}</div>
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">{t.heroStatWarrantyValue}</div>
                <div className="text-[10px] text-slate-400">{t.heroStatWarranty}</div>
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">{t.heroStatExperienceValue}</div>
                <div className="text-[10px] text-slate-400">{t.heroStatExperience}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-0.5 text-sm font-extrabold text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rating.average}</span>
                </div>
                <div className="text-[10px] text-slate-400">{reviewsCountLabel(language, rating.count)}</div>
              </div>
            </div>

          </div>

          {/* Minimalist Floating Slide Indicator Badge (Displays car model on the other corner) */}
          <div className="w-full lg:w-auto flex justify-end">
            <div className="bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/60 shadow-xl flex items-center gap-3 text-xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white text-[11px] sm:text-xs">{active.carTitle}</span>
                </div>
                <div className="text-[10px] text-amber-400">{active.filmBrand}</div>
              </div>

              <button
                onClick={() => openBookingWithPreselect(active.serviceId, active.carCategory)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[10px] font-bold cursor-pointer transition-colors whitespace-nowrap"
              >
                Выбрать →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Slide Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-20 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-white hover:text-amber-400 transition-all cursor-pointer shadow-lg"
              title="Предыдущее фото"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-white hover:text-amber-400 transition-all cursor-pointer shadow-lg"
              title="Следующее фото"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-amber-400 transition-all cursor-pointer shadow-lg hidden sm:block"
              title={isAutoPlay ? 'Пауза' : 'Воспроизведение'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-6 h-2 bg-gradient-to-r from-amber-400 to-amber-600 shadow-md shadow-amber-500/40'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                title={s.carTitle}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
