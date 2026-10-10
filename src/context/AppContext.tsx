import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode, Booking, Review, ServiceItem, Master, Promotion, SecurityLog, CarCategory, HeroSlide, GalleryItem, InstagramPost } from '../types';
import { translations, Translations } from '../data/translations';
import { INITIAL_SERVICES, INITIAL_MASTERS, INITIAL_PROMOTIONS, INITIAL_REVIEWS, INITIAL_BOOKINGS, INITIAL_HERO_SLIDES, GALLERY_ITEMS, INITIAL_INSTAGRAM_POSTS } from '../data/initialData';
import {
  adminLogin,
  adminLogout,
  createBooking,
  createReview,
  deletePublicReview,
  fetchBookings,
  fetchContent,
  fetchAccount,
  registerAccount,
  loginAccount,
  claimBooking,
  getClientToken,
  setClientToken,
  type ClientProfile,
  fetchPublicReviews,
  getAdminToken,
  patchBookingStatus,
  saveContent,
  type LoginResult,
} from '../utils/api';

// Local `vite dev` has no /api functions, so the admin panel opens without a password there.
const DEV_MODE = import.meta.env.DEV;

export type AdminTab = 
  | 'orders' 
  | 'site_cms' 
  | 'promotions' 
  | 'masters' 
  | 'prices' 
  | 'schedule' 
  | 'portfolio' 
  | 'reviews' 
  | 'telegram';

export interface StudioSettings {
  studioName: string;
  studioTagline: string;
  workHours: string;
  address: string;
  phone: string;
  contactPerson: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  gisLink: string;
  yandexMapsLink: string;
  heroSlideInterval: number; // in milliseconds (e.g. 2100ms default, fast speed)
  heroTextPosition: 'left' | 'right';
  heroAutoPlay: boolean;
  announcementActive: boolean;
}

const DEFAULT_SETTINGS: StudioSettings = {
  studioName: 'TONIX TINT STUDIO',
  studioTagline: 'Премиальная тонировка и бронирование авто в Бишкеке',
  workHours: 'Ежедневно: 09:00 – 21:00 (без выходных)',
  address: 'Проспект Жибек-Жолу, 730/1, Ленинский район, г. Бишкек, 720033',
  phone: '+996 700 910 777',
  contactPerson: 'Кадырбеков Арген (Шеф-мастер & Контактное лицо)',
  whatsapp: '+996 700 910 777',
  telegram: '@tonix_tint_kg',
  instagram: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
  gisLink: 'https://2gis.kg/bishkek',
  yandexMapsLink: 'https://yandex.ru/maps/bishkek',
  heroSlideInterval: 1800, // fast, dynamic slide speed (responsive to user request)
  heroTextPosition: 'left',
  heroAutoPlay: true,
  announcementActive: true
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: Translations;
  services: ServiceItem[];
  updateServicePrice: (serviceId: string, prices: { priceSedan: number; priceCrossover: number; priceSuv: number; pricePremium: number }) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  deleteService: (serviceId: string) => void;
  masters: Master[];
  addMaster: (newMaster: Omit<Master, 'id'>) => void;
  updateMaster: (id: string, updated: Partial<Master>) => void;
  deleteMaster: (id: string) => void;
  studioSettings: StudioSettings;
  updateStudioSettings: (settings: Partial<StudioSettings>) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'likes' | 'verified'>) => void;
  deleteReview: (id: string) => void;
  promotions: Promotion[];
  addPromotion: (newPromo: Omit<Promotion, 'id'>) => void;
  updatePromotion: (id: string, updated: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  announcementText: string;
  updateAnnouncementText: (text: string) => void;
  bookings: Booking[];
  activePromoCode: string | null;
  setActivePromoCode: (code: string | null) => void;
  
  // Hero Slides CMS
  heroSlides: HeroSlide[];
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updated: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;

  // Portfolio / Gallery CMS
  portfolioItems: GalleryItem[];
  addPortfolioItem: (item: Omit<GalleryItem, 'id'>) => void;
  updatePortfolioItem: (id: string, updated: Partial<GalleryItem>) => void;
  deletePortfolioItem: (id: string) => void;

  // Modals state
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isCabinetOpen: boolean;
  setIsCabinetOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminActiveTab: AdminTab;
  setAdminActiveTab: (tab: AdminTab) => void;
  openAdminTab: (tab: AdminTab) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Booking config pre-selection
  bookingPreselection: { serviceId?: string; carCategory?: CarCategory } | null;
  openBookingWithPreselect: (serviceId?: string, carCategory?: CarCategory) => void;

  // Actions
  addBooking: (newBooking: Omit<Booking, 'id' | 'createdAt' | 'telegramSent'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  
  // User Security & 2FA
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  securityLogs: SecurityLog[];
  addSecurityLog: (event: string, status: 'success' | 'warning' | 'alert') => void;

  // Notifications
  pushEnabled: boolean;
  togglePush: () => void;
  notifications: Array<{ id: string; title: string; body: string; time: string; type: 'success' | 'info' | 'alert' }>;
  addNotification: (title: string, body: string, type?: 'success' | 'info' | 'alert') => void;
  clearNotifications: () => void;

  // Instagram Feed Integration
  instagramPosts: InstagramPost[];
  syncInstagramFeed: () => Promise<void>;
  likeInstagramPost: (postId: string) => void;
  isSyncingInstagram: boolean;
  lastInstagramSyncTime: string;
  instagramSyncStatus: 'synced' | 'syncing' | 'error';

  // Telegram simulation log
  telegramLogs: Array<{ id: string; time: string; text: string; bookingId: string }>;

  // Client cabinet: account with phone + password
  clientBookings: Booking[];
  clientProfile: ClientProfile | null;
  isClientLoggedIn: boolean;
  pendingBooking: boolean;
  setPendingBooking: (value: boolean) => void;
  isClientLoading: boolean;
  clientLogin: (phone: string, password: string) => Promise<ClientAuthResult>;
  clientRegister: (data: { name: string; phone: string; password: string; bookingId?: string }) => Promise<ClientAuthResult>;
  clientClaimBooking: (bookingId: string) => Promise<'ok' | 'not_found' | 'error'>;
  clientLogout: () => void;
  refreshClientBookings: () => Promise<void>;

  // Admin authentication (password checked on the server)
  isAdminAuthed: boolean;
  loginAdmin: (password: string) => Promise<LoginResult>;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  LANG: 'tonixtint_lang',
  THEME: 'tonixtint_theme',
  BOOKINGS: 'tonixtint_bookings',
  REVIEWS: 'tonixtint_reviews',
  TWO_FA: 'tonixtint_2fa',
  PUSH: 'tonixtint_push',
  SERVICES: 'tonixtint_services',
  MASTERS: 'tonixtint_masters',
  SETTINGS: 'tonixtint_studio_settings',
  PROMOTIONS: 'tonixtint_promotions',
  ANNOUNCEMENT: 'tonixtint_announcement',
  HERO_SLIDES: 'tonixtint_hero_slides',
  PORTFOLIO: 'tonixtint_portfolio',
  INSTAGRAM_POSTS: 'tonixtint_instagram_posts'
};

export type ClientAuthResult =
  | 'ok'
  | 'wrong_credentials'
  | 'already_registered'
  | 'booking_required'
  | 'booking_mismatch'
  | 'weak_password'
  | 'error';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.LANG) as Language) || 'ru';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as ThemeMode) || 'dark';
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SERVICES;
  });

  const [masters, setMasters] = useState<Master[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MASTERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_MASTERS;
  });

  const [studioSettings, setStudioSettings] = useState<StudioSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        const interval = (parsed.heroSlideInterval && parsed.heroSlideInterval <= 2000) ? parsed.heroSlideInterval : 1800;
        const instagram = (!parsed.instagram || parsed.instagram.includes('tonix_tint_bishkek'))
          ? 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA=='
          : parsed.instagram;
        return { ...DEFAULT_SETTINGS, ...parsed, heroSlideInterval: interval, instagram }; 
      } catch (e) { /* ignore */ }
    }
    return DEFAULT_SETTINGS;
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROMOTIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROMOTIONS;
  });

  const [announcementText, setAnnouncementTextState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ANNOUNCEMENT) || 'Скидка 15% на оригинальную тонировку LLumar и бронь фар в подарок при онлайн-записи в Бишкеке!';
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.REVIEWS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_REVIEWS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BOOKINGS;
  });

  // Reviews submitted by visitors (stored on the server separately from the curated list)
  const [publicReviews, setPublicReviews] = useState<Review[]>([]);

  const [isAdminAuthed, setIsAdminAuthed] = useState<boolean>(() => DEV_MODE || Boolean(getAdminToken()));

  // Client cabinet session (credentials remembered on this device)
  const [isClientLoggedIn, setIsClientLoggedIn] = useState<boolean>(() => Boolean(getClientToken()));
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [clientBookings, setClientBookings] = useState<Booking[]>([]);
  const [isClientLoading, setIsClientLoading] = useState(false);

  const [activePromoCode, setActivePromoCode] = useState<string | null>(null);

  // Hero Slides CMS
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.HERO_SLIDES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_HERO_SLIDES;
  });

  // Portfolio / Gallery CMS
  const [portfolioItems, setPortfolioItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PORTFOLIO);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return GALLERY_ITEMS;
  });

  // Modals
  const [isBookingOpen, setIsBookingOpenState] = useState(false);
  // Booking requires a client account: remember that the visitor wanted to book while they sign in.
  const [pendingBooking, setPendingBooking] = useState(false);
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('orders');
  
  const openAdminTab = (tab: AdminTab) => {
    setAdminActiveTab(tab);
    setIsAdminOpen(true);
  };

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bookingPreselection, setBookingPreselection] = useState<{ serviceId?: string; carCategory?: CarCategory } | null>(null);

  // Security & 2FA
  const [twoFactorEnabled, setTwoFactorEnabledState] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.TWO_FA) === 'true';
  });

  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([
    { id: 'sec-1', timestamp: '2026-10-08 11:20:14', event: 'Вход в личный кабинет через SMS-код Кыргызстан (+996 550 ...)', ip: '212.112.98.44 (Бишкек, MegaCom)', status: 'success' },
    { id: 'sec-2', timestamp: '2026-10-08 09:12:05', event: 'Двухфакторная авторизация 2FA успешно подтверждена', ip: '212.112.98.44 (Бишкек)', status: 'success' },
    { id: 'sec-3', timestamp: '2026-10-07 19:40:50', event: 'Резервная копия данных клиентов экспортирована (Encrypted AES)', ip: '192.168.1.1 (CRM Сервер)', status: 'success' }
  ]);

  // Push notifications
  const [pushEnabled, setPushEnabled] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.PUSH) === 'true';
  });

  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; body: string; time: string; type: 'success' | 'info' | 'alert' }>>([
    {
      id: 'notif-1',
      title: 'Добро пожаловать в TONIX TINT STUDIO!',
      body: 'Студия тонировки и бронирования в Бишкеке. Запишитесь онлайн и получите скидку до 20%.',
      time: 'Только что',
      type: 'info'
    }
  ]);

  const [telegramLogs, setTelegramLogs] = useState<Array<{ id: string; time: string; text: string; bookingId: string }>>([
    {
      id: 'tg-1',
      time: '08.10.2026 12:45',
      text: '🔔 Новая запись #BK-78901: Lexus LX 600, Бронирование «Зоны риска» PPF, Клиент: Бексултан (+996 550 443 322). Мастер: Кадырбеков Арген.',
      bookingId: 'BK-78901'
    }
  ]);

  // Instagram Feed State & API Sync
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.INSTAGRAM_POSTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_INSTAGRAM_POSTS;
  });

  const [isSyncingInstagram, setIsSyncingInstagram] = useState(false);
  const [lastInstagramSyncTime, setLastInstagramSyncTime] = useState('только что');
  const [instagramSyncStatus, setInstagramSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');

  const syncInstagramFeed = async () => {
    setIsSyncingInstagram(true);
    setInstagramSyncStatus('syncing');
    try {
      // Instagram blocks direct browser requests (it returned HTTP 400 and a console error),
      // so the feed shows the posts curated in the admin panel / built-in data.
      await new Promise(r => setTimeout(r, 400));

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastInstagramSyncTime(timeStr);
      setInstagramSyncStatus('synced');
    } catch {
      setInstagramSyncStatus('error');
    } finally {
      setIsSyncingInstagram(false);
    }
  };

  const likeInstagramPost = (postId: string) => {
    setInstagramPosts(prev => {
      const updated = prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.INSTAGRAM_POSTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Sync theme
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#131d33' : '#f5f7fb');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#131d33] text-slate-100 antialiased selection:bg-amber-500 selection:text-black';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f5f7fb] text-[#0f172a] antialiased selection:bg-amber-500 selection:text-white';
    }
  }, [theme]);

  // Sync language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, lang);
  };

  // App shortcuts (long-press on the installed app icon): ?action=book / ?action=cabinet
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (!action) return;
    if (action === 'cabinet') setIsCabinetOpen(true);
    if (action === 'book') setIsBookingOpen(true);
    params.delete('action');
    const query = params.toString();
    history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : '') + window.location.hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hidden admin access: URL hash (#admin) or hotkey (Alt+A / Ctrl+Shift+A)
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф')) || 
          (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф'))) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTwoFactorEnabled = (enabled: boolean) => {
    setTwoFactorEnabledState(enabled);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TWO_FA, String(enabled));
    addSecurityLog(enabled ? 'Двухфакторная аутентификация 2FA включена' : 'Двухфакторная аутентификация 2FA отключена', 'warning');
  };

  const togglePush = () => {
    const next = !pushEnabled;
    setPushEnabled(next);
    localStorage.setItem(LOCAL_STORAGE_KEYS.PUSH, String(next));
    if (next) {
      addNotification('Уведомления включены', 'Вы будете первыми получать статус готовности авто в боксе.', 'success');
    }
  };

  const addNotification = (title: string, body: string, type: 'success' | 'info' | 'alert' = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      body,
      time: 'Только что',
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Save a piece of site content: locally for this browser, and on the server when the admin is signed in.
  const persistContent = (contentKey: string, lsKey: string, value: unknown) => {
    try {
      localStorage.setItem(lsKey, typeof value === 'string' ? value : JSON.stringify(value));
    } catch {
      /* storage full or unavailable */
    }
    if (!getAdminToken()) return;
    saveContent({ [contentKey]: value }).catch((err: { status?: number }) => {
      if (err.status === 401) {
        adminLogout();
        setIsAdminAuthed(DEV_MODE);
        addNotification('Сессия истекла', 'Войдите в админ-панель снова, чтобы сохранять изменения на сайте.', 'alert');
      } else {
        addNotification('Не сохранено на сервере', 'Изменение сохранено только в этом браузере. Проверьте подключение к базе данных.', 'alert');
      }
    });
  };

  // Load content published from the admin panel, plus visitor reviews.
  useEffect(() => {
    let cancelled = false;
    fetchContent()
      .then(({ content }) => {
        if (cancelled || !content) return;
        const c = content as Record<string, any>;
        if (Array.isArray(c.services)) setServices(c.services);
        if (Array.isArray(c.masters)) setMasters(c.masters);
        if (c.settings && typeof c.settings === 'object') setStudioSettings({ ...DEFAULT_SETTINGS, ...c.settings });
        if (Array.isArray(c.promotions)) setPromotions(c.promotions);
        if (typeof c.announcement === 'string') setAnnouncementTextState(c.announcement);
        if (Array.isArray(c.reviews)) setReviews(c.reviews);
        if (Array.isArray(c.heroSlides) && c.heroSlides.length > 0) setHeroSlides(c.heroSlides);
        if (Array.isArray(c.portfolio)) setPortfolioItems(c.portfolio);
      })
      .catch(() => {
        /* no API (local dev) or storage not configured: keep built-in/local data */
      });
    fetchPublicReviews()
      .then(({ reviews: list }) => {
        if (!cancelled && Array.isArray(list)) setPublicReviews(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // When the admin is signed in, show the real bookings stored on the server.
  useEffect(() => {
    if (!isAdminAuthed || !isAdminOpen || !getAdminToken()) return;
    fetchBookings()
      .then(({ bookings: list }) => {
        if (Array.isArray(list)) setBookings(list);
      })
      .catch((err: { status?: number }) => {
        if (err.status === 401) {
          adminLogout();
          setIsAdminAuthed(DEV_MODE);
        }
      });
  }, [isAdminAuthed, isAdminOpen]);

  const loginAdmin = async (password: string): Promise<LoginResult> => {
    const result = await adminLogin(password);
    if (result === 'ok') setIsAdminAuthed(true);
    return result;
  };

  const applyAccount = (data: { token?: string; profile: ClientProfile; bookings: Booking[] }) => {
    if (data.token) setClientToken(data.token);
    setIsClientLoggedIn(true);
    setClientProfile(data.profile);
    setClientBookings(data.bookings);
    if (data.token && pendingBooking) {
      // The visitor signed in to book: continue straight to the booking form.
      setPendingBooking(false);
      setIsCabinetOpen(false);
      setIsBookingOpenState(true);
    }
  };

  const toAuthResult = (err: unknown): ClientAuthResult => {
    const code = (err as Error).message;
    const known: ClientAuthResult[] = ['wrong_credentials', 'already_registered', 'booking_required', 'booking_mismatch', 'weak_password'];
    return known.includes(code as ClientAuthResult) ? (code as ClientAuthResult) : 'error';
  };

  const clientLogin = async (phone: string, password: string): Promise<ClientAuthResult> => {
    setIsClientLoading(true);
    try {
      applyAccount(await loginAccount(phone, password));
      return 'ok';
    } catch (err) {
      return toAuthResult(err);
    } finally {
      setIsClientLoading(false);
    }
  };

  const clientRegister = async (data: { name: string; phone: string; password: string; bookingId?: string }): Promise<ClientAuthResult> => {
    setIsClientLoading(true);
    try {
      applyAccount(await registerAccount(data));
      return 'ok';
    } catch (err) {
      return toAuthResult(err);
    } finally {
      setIsClientLoading(false);
    }
  };

  const clientLogout = () => {
    setClientToken(null);
    setIsClientLoggedIn(false);
    setClientProfile(null);
    setClientBookings([]);
  };

  const refreshClientBookings = async () => {
    if (!getClientToken()) return;
    setIsClientLoading(true);
    try {
      applyAccount(await fetchAccount());
    } catch (err) {
      if ((err as { status?: number }).status === 401) clientLogout();
    } finally {
      setIsClientLoading(false);
    }
  };

  const clientClaimBooking = async (bookingId: string): Promise<'ok' | 'not_found' | 'error'> => {
    try {
      const { bookings: list } = await claimBooking(bookingId);
      setClientBookings(list);
      return 'ok';
    } catch (err) {
      return (err as { status?: number }).status === 404 ? 'not_found' : 'error';
    }
  };

  // Load the client's account when the cabinet opens (fresh statuses from the studio).
  useEffect(() => {
    if (isCabinetOpen && isClientLoggedIn) refreshClientBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCabinetOpen]);

  const logoutAdmin = () => {
    adminLogout();
    setIsAdminAuthed(DEV_MODE);
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const addSecurityLog = (event: string, status: 'success' | 'warning' | 'alert') => {
    const newLog: SecurityLog = {
      id: `sec-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      event,
      ip: '212.112.98.44 (Бишкек)',
      status
    };
    setSecurityLogs(prev => [newLog, ...prev]);
  };

  // Service Price Management
  const updateServicePrice = (serviceId: string, prices: { priceSedan: number; priceCrossover: number; priceSuv: number; pricePremium: number }) => {
    const updated = services.map(s => {
      if (s.id === serviceId) {
        return { ...s, ...prices };
      }
      return s;
    });
    setServices(updated);
    persistContent('services', LOCAL_STORAGE_KEYS.SERVICES, updated);
    addNotification('Цены обновлены', 'Новые цены успешно сохранены и отображаются в калькуляторе.', 'success');
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const created: ServiceItem = {
      ...newService,
      id: `service-${Date.now()}`
    };
    const updated = [created, ...services];
    setServices(updated);
    persistContent('services', LOCAL_STORAGE_KEYS.SERVICES, updated);
    addNotification('Услуга добавлена', `Услуга «${created.titleKey}» добавлена в прайс-лист.`, 'success');
  };

  const deleteService = (serviceId: string) => {
    const updated = services.filter(s => s.id !== serviceId);
    setServices(updated);
    persistContent('services', LOCAL_STORAGE_KEYS.SERVICES, updated);
    addNotification('Услуга удалена', 'Услуга удалена из каталога.', 'info');
  };

  // Masters Management
  const addMaster = (newMaster: Omit<Master, 'id'>) => {
    const created: Master = {
      ...newMaster,
      id: `master-${Date.now()}`
    };
    const updated = [...masters, created];
    setMasters(updated);
    persistContent('masters', LOCAL_STORAGE_KEYS.MASTERS, updated);
    addNotification('Мастер добавлен', `${created.name} добавлен в команду студии.`, 'success');
  };

  const updateMaster = (id: string, updatedFields: Partial<Master>) => {
    const updated = masters.map(m => {
      if (m.id === id) {
        return { ...m, ...updatedFields };
      }
      return m;
    });
    setMasters(updated);
    persistContent('masters', LOCAL_STORAGE_KEYS.MASTERS, updated);
    addNotification('Данные мастера обновлены', 'Изменения сохранены.', 'success');
  };

  const deleteMaster = (id: string) => {
    const updated = masters.filter(m => m.id !== id);
    setMasters(updated);
    persistContent('masters', LOCAL_STORAGE_KEYS.MASTERS, updated);
    addNotification('Мастер удален', 'Специалист удален из списка.', 'info');
  };

  // Studio Settings (Schedule, address, phone, contact person)
  const updateStudioSettings = (newSettings: Partial<StudioSettings>) => {
    const updated = { ...studioSettings, ...newSettings };
    setStudioSettings(updated);
    persistContent('settings', LOCAL_STORAGE_KEYS.SETTINGS, updated);
    addNotification('Настройки студии сохранены', 'График работы и контакты обновлены.', 'success');
  };

  // Promotions Management
  const addPromotion = (newPromo: Omit<Promotion, 'id'>) => {
    const created: Promotion = {
      ...newPromo,
      id: `promo-${Date.now()}`
    };
    const updated = [created, ...promotions];
    setPromotions(updated);
    persistContent('promotions', LOCAL_STORAGE_KEYS.PROMOTIONS, updated);
    addNotification('Акция объявлена!', `Акция «${created.title}» опубликована на сайте.`, 'success');
  };

  const updatePromotion = (id: string, updatedFields: Partial<Promotion>) => {
    const updated = promotions.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    setPromotions(updated);
    persistContent('promotions', LOCAL_STORAGE_KEYS.PROMOTIONS, updated);
    addNotification('Акция обновлена', 'Изменения сохранены.', 'success');
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.filter(p => p.id !== id);
    setPromotions(updated);
    persistContent('promotions', LOCAL_STORAGE_KEYS.PROMOTIONS, updated);
    addNotification('Акция удалена', 'Акция снята с публикации.', 'info');
  };

  const updateAnnouncementText = (text: string) => {
    setAnnouncementTextState(text);
    persistContent('announcement', LOCAL_STORAGE_KEYS.ANNOUNCEMENT, text);
    addNotification('Баннер обновлен', 'Текст бегущей строки в шапке сайта изменен.', 'success');
  };

  // Bookings
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'telegramSent'>): Booking => {
    const newId = `BK-${Date.now().toString(36).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
      telegramSent: false
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

    // Send the booking to the studio (server stores it and notifies Telegram).
    createBooking({ ...bookingData, id: newId })
      .then(({ booking }) => {
        if (getClientToken()) {
          setClientBookings(prev => [booking, ...prev.filter(b => b.id !== booking.id)]);
        }
        setBookings(prev => {
          const next = prev.map(b => (b.id === newId ? { ...b, telegramSent: booking.telegramSent } : b));
          try { localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(next)); } catch { /* ignore */ }
          return next;
        });
      })
      .catch(() => {
        if (!DEV_MODE) {
          addNotification(
            'Запись не отправлена',
            `Не удалось передать заявку в студию. Позвоните нам: ${studioSettings.phone}`,
            'alert'
          );
        }
      });

    // Telegram Bot notification simulation
    const tgMsg = `🔔 Новая запись ${newId} в TONIX TINT STUDIO!\n🚗 Авто: ${newBooking.carBrand} ${newBooking.carModel} (${newBooking.carYear})\n🛠 Услуга: ${newBooking.serviceTitle}\n👨‍🔧 Мастер: ${newBooking.masterName}\n📅 Дата: ${newBooking.bookingDate} в ${newBooking.bookingTime}\n💰 Сумма: ${newBooking.priceKgs.toLocaleString()} KGS\n👤 Клиент: ${newBooking.clientName} (${newBooking.clientPhone})\n💳 Оплата: ${newBooking.paymentMethod.toUpperCase()}`;
    
    setTelegramLogs(prev => [
      {
        id: `tg-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: tgMsg,
        bookingId: newId
      },
      ...prev
    ]);

    addNotification('Новая запись оформлена!', `Заказ #${newId} передан мастеру ${newBooking.masterName}.`, 'success');
    addSecurityLog(`Оформлена онлайн-запись ${newId} на сумму ${newBooking.priceKgs} KGS`, 'success');

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    if (getAdminToken()) {
      patchBookingStatus(id, status).catch(() =>
        addNotification('Статус не сохранен на сервере', `Повторите изменение статуса заказа #${id}.`, 'alert')
      );
    }

    addNotification('Статус заказа изменен', `Заказ #${id} переведен в статус: ${status}`, 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'likes' | 'verified'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Сегодня',
      likes: 1,
      verified: true
    };

    // Admin adds to the curated list; visitors' reviews go to the server's public list.
    if (getAdminToken() || DEV_MODE) {
      const updated = [newRev, ...reviews];
      setReviews(updated);
      persistContent('reviews', LOCAL_STORAGE_KEYS.REVIEWS, updated);
      addNotification('Отзыв опубликован', 'Спасибо за высокую оценку нашей работы!', 'success');
      return;
    }

    setPublicReviews(prev => [newRev, ...prev]);
    createReview(reviewData)
      .then(({ review }) => {
        setPublicReviews(prev => prev.map(r => (r.id === newRev.id ? review : r)));
        addNotification('Отзыв опубликован', 'Спасибо за отзыв о нашей работе!', 'success');
      })
      .catch(() => {
        setPublicReviews(prev => prev.filter(r => r.id !== newRev.id));
        addNotification('Отзыв не отправлен', 'Не удалось сохранить отзыв. Попробуйте позже.', 'alert');
      });
  };

  const deleteReview = (id: string) => {
    if (publicReviews.some(r => r.id === id)) {
      setPublicReviews(prev => prev.filter(r => r.id !== id));
      if (getAdminToken()) {
        deletePublicReview(id).catch(() =>
          addNotification('Отзыв не удален на сервере', 'Повторите попытку.', 'alert')
        );
      }
    } else {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      persistContent('reviews', LOCAL_STORAGE_KEYS.REVIEWS, updated);
    }
    addNotification('Отзыв удален', 'Отзыв снят с публикации.', 'info');
  };

  // Hero Slides CMS Handlers
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`
    };
    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    persistContent('heroSlides', LOCAL_STORAGE_KEYS.HERO_SLIDES, updated);
    addNotification('Слайд добавлен', `Слайд «${newSlide.carTitle}» добавлен в главный баннер.`, 'success');
  };

  const updateHeroSlide = (id: string, updatedFields: Partial<HeroSlide>) => {
    const updated = heroSlides.map(s => s.id === id ? { ...s, ...updatedFields } : s);
    setHeroSlides(updated);
    persistContent('heroSlides', LOCAL_STORAGE_KEYS.HERO_SLIDES, updated);
    addNotification('Слайд обновлен', 'Настройки слайда сохранены.', 'success');
  };

  const deleteHeroSlide = (id: string) => {
    if (heroSlides.length <= 1) {
      addNotification('Внимание', 'На баннере должен оставаться хотя бы 1 слайд.', 'alert');
      return;
    }
    const updated = heroSlides.filter(s => s.id !== id);
    setHeroSlides(updated);
    persistContent('heroSlides', LOCAL_STORAGE_KEYS.HERO_SLIDES, updated);
    addNotification('Слайд удален', 'Слайд убран из слайд-шоу.', 'info');
  };

  // Portfolio / Gallery CMS Handlers
  const addPortfolioItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    const updated = [newItem, ...portfolioItems];
    setPortfolioItems(updated);
    persistContent('portfolio', LOCAL_STORAGE_KEYS.PORTFOLIO, updated);
    addNotification('Работа добавлена', `Автомобиль «${newItem.car}» добавлен в портфолио.`, 'success');
  };

  const updatePortfolioItem = (id: string, updatedFields: Partial<GalleryItem>) => {
    const updated = portfolioItems.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setPortfolioItems(updated);
    persistContent('portfolio', LOCAL_STORAGE_KEYS.PORTFOLIO, updated);
    addNotification('Работа обновлена', 'Изменения в галерее сохранены.', 'success');
  };

  const deletePortfolioItem = (id: string) => {
    const updated = portfolioItems.filter(p => p.id !== id);
    setPortfolioItems(updated);
    persistContent('portfolio', LOCAL_STORAGE_KEYS.PORTFOLIO, updated);
    addNotification('Работа удалена', 'Проект удален из портфолио.', 'info');
  };

  // Booking is only available to signed-in clients (the admin and local dev can always open it).
  const setIsBookingOpen = (open: boolean) => {
    if (open && !isClientLoggedIn && !getAdminToken() && !DEV_MODE) {
      setPendingBooking(true);
      setIsCabinetOpen(true);
      return;
    }
    setIsBookingOpenState(open);
  };

  const openBookingWithPreselect = (serviceId?: string, carCategory?: CarCategory) => {
    setBookingPreselection({ serviceId, carCategory });
    setIsBookingOpen(true);
  };

  // Merge dynamic studio settings into translations object for live UI sync
  const baseT = translations[language];
  const t: Translations = {
    ...baseT,
    workHours: studioSettings.workHours,
    address: studioSettings.address,
    phone: studioSettings.phone,
    whatsapp: studioSettings.whatsapp,
    contactPerson: studioSettings.contactPerson
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        services,
        updateServicePrice,
        addService,
        deleteService,
        masters,
        addMaster,
        updateMaster,
        deleteMaster,
        studioSettings,
        updateStudioSettings,
        reviews: [...publicReviews.filter(p => !reviews.some(r => r.id === p.id)), ...reviews],
        addReview,
        deleteReview,
        promotions,
        addPromotion,
        updatePromotion,
        deletePromotion,
        announcementText,
        updateAnnouncementText,
        bookings,
        activePromoCode,
        setActivePromoCode,
        heroSlides,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        portfolioItems,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        isBookingOpen,
        setIsBookingOpen,
        isCabinetOpen,
        setIsCabinetOpen,
        isAdminOpen,
        setIsAdminOpen,
        adminActiveTab,
        setAdminActiveTab,
        openAdminTab,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isChatOpen,
        setIsChatOpen,
        bookingPreselection,
        openBookingWithPreselect,
        addBooking,
        updateBookingStatus,
        twoFactorEnabled,
        setTwoFactorEnabled,
        securityLogs,
        addSecurityLog,
        pushEnabled,
        togglePush,
        notifications,
        addNotification,
        clearNotifications,
        telegramLogs,
        instagramPosts,
        syncInstagramFeed,
        likeInstagramPost,
        isSyncingInstagram,
        lastInstagramSyncTime,
        instagramSyncStatus,
        clientBookings,
        clientProfile,
        isClientLoggedIn,
        pendingBooking,
        setPendingBooking,
        isClientLoading,
        clientLogin,
        clientRegister,
        clientClaimBooking,
        clientLogout,
        refreshClientBookings,
        isAdminAuthed,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
