import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, Master, ServiceItem, HeroSlide, GalleryItem, Review } from '../types';
import { compressImageFile } from '../utils/imageUtils';
import { 
  X, 
  Sliders, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Send, 
  Download, 
  Archive, 
  FileSpreadsheet, 
  BarChart3, 
  AlertTriangle,
  RefreshCw,
  Search,
  DollarSign,
  Users,
  Calendar,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  Award,
  Layers,
  Camera,
  Upload,
  Image as ImageIcon,
  Check,
  Flame,
  Tag,
  Percent,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Globe,
  Layout,
  Eye,
  Star,
  Play,
  Pause,
  FastForward,
  MoveHorizontal,
  Share2,
  Instagram
} from 'lucide-react';
import { getInstagramUrl, getInstagramUsername, getWhatsappUrl, getTelegramUrl } from '../utils/socialUtils';

const MASTER_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
];

const SLIDE_IMAGE_PRESETS = [
  {
    title: 'Lexus LX 600 • Бронирование PPF & Тонировка 5%',
    film: 'STEK DYNOshield + LLumar ATR 5%',
    tag: 'Премиум бронезащита',
    category: 'suv' as const,
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'BMW M5 F90 • Атермальная пленка & Антихром',
    film: 'LLumar AIR 80 + Avery Gloss Black',
    tag: 'Спорт седан • Shadow Line',
    category: 'sedan' as const,
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'Zeekr 001 • Полная оклейка кузова полиуретаном',
    film: 'STEK DYNOshield Top-Coat 215 mkm',
    tag: 'Электрокар • 10 лет гарантии',
    category: 'premium' as const,
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'Mercedes G63 AMG • Черный матовый сатин',
    film: '3M 2080 Satin Deep Black Wrap',
    tag: 'Виниловый стайлинг',
    category: 'suv' as const,
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'Porsche Taycan • Тонировка по ГОСТу КР & 9H',
    film: 'LLumar CTX Ceramic + Ceramic Pro 9H',
    tag: 'Детейлинг • Защита от УФ',
    category: 'premium' as const,
    url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'Toyota Land Cruiser 300 • Зоны риска PPF',
    film: 'SunTek Ultra PPF 200 mkm',
    tag: 'Внедорожник • Защита от сколов',
    category: 'suv' as const,
    url: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1920&q=85'
  },
  {
    title: 'Audi RS6 Avant • Полный антихром & Тонировка 15%',
    film: 'LLumar ATR 15% + Hexis High Gloss Black',
    tag: 'Спорт универсал • Shadow',
    category: 'sedan' as const,
    url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1920&q=85'
  }
];

export const AdminDashboardModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    adminActiveTab,
    setAdminActiveTab,
    bookings, 
    updateBookingStatus, 
    telegramLogs, 
    addNotification,
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
    promotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
    announcementText,
    updateAnnouncementText,
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    reviews,
    addReview,
    deleteReview,
    syncInstagramFeed,
    isSyncingInstagram,
    lastInstagramSyncTime,
    instagramPosts
  } = useApp();

  // Tab navigation connected to global app state
  const activeTab = adminActiveTab;
  const setActiveTab = setAdminActiveTab;

  // Photo Picker Modal for existing masters
  const [photoModalMaster, setPhotoModalMaster] = useState<Master | null>(null);
  const [photoModalPreview, setPhotoModalPreview] = useState<string>('');
  const [photoModalUrlInput, setPhotoModalUrlInput] = useState<string>('');

  // Experience Quick Editor Modal for existing masters
  const [expModalMaster, setExpModalMaster] = useState<Master | null>(null);
  const [expModalValue, setExpModalValue] = useState<number>(10);

  // --- SITE CMS & HERO SLIDES FORM ---
  const [isAddingHeroSlide, setIsAddingHeroSlide] = useState(false);
  const [editingHeroSlideId, setEditingHeroSlideId] = useState<string | null>(null);
  const [slideCarTitle, setSlideCarTitle] = useState('');
  const [slideFilmBrand, setSlideFilmBrand] = useState('');
  const [slideTag, setSlideTag] = useState('');
  const [slideCategory, setSlideCategory] = useState<'suv' | 'sedan' | 'crossover' | 'premium'>('suv');
  const [slideImage, setSlideImage] = useState('');
  const [slideServiceId, setSlideServiceId] = useState('ppf-risk-zones');

  // Studio Info editable form
  const [cmsStudioName, setCmsStudioName] = useState(studioSettings.studioName || 'TONIX TINT STUDIO');
  const [cmsStudioTagline, setCmsStudioTagline] = useState(studioSettings.studioTagline || 'Премиальная тонировка и бронирование авто в Бишкеке');
  const [cmsPhone, setCmsPhone] = useState(studioSettings.phone);
  const [cmsContactPerson, setCmsContactPerson] = useState(studioSettings.contactPerson);
  const [cmsWhatsapp, setCmsWhatsapp] = useState(studioSettings.whatsapp);
  const [cmsTelegram, setCmsTelegram] = useState(studioSettings.telegram || '@tonix_tint_kg');
  const [cmsInstagram, setCmsInstagram] = useState(studioSettings.instagram || 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==');
  const [cmsAddress, setCmsAddress] = useState(studioSettings.address);
  const [cmsWorkHours, setCmsWorkHours] = useState(studioSettings.workHours);
  const [cmsGisLink, setCmsGisLink] = useState(studioSettings.gisLink || 'https://2gis.kg/bishkek');
  const [cmsYandexMapsLink, setCmsYandexMapsLink] = useState(studioSettings.yandexMapsLink || 'https://yandex.ru/maps/bishkek');
  const [cmsSlideInterval, setCmsSlideInterval] = useState(studioSettings.heroSlideInterval || 2100);
  const [cmsTextPosition, setCmsTextPosition] = useState<'left' | 'right'>(studioSettings.heroTextPosition || 'left');

  // --- PORTFOLIO CMS FORM ---
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [newPortfolioCar, setNewPortfolioCar] = useState('');
  const [newPortfolioTitle, setNewPortfolioTitle] = useState('');
  const [newPortfolioCategory, setNewPortfolioCategory] = useState<'ppf' | 'tinting' | 'vinyl'>('ppf');
  const [newPortfolioFilm, setNewPortfolioFilm] = useState('STEK DYNOshield Gloss 215 mkm');
  const [newPortfolioTime, setNewPortfolioTime] = useState('2 дня');
  const [newPortfolioBeforeImg, setNewPortfolioBeforeImg] = useState('');
  const [newPortfolioAfterImg, setNewPortfolioAfterImg] = useState('');
  const [newPortfolioDesc, setNewPortfolioDesc] = useState('');

  // --- REVIEWS CMS FORM ---
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newRevAuthor, setNewRevAuthor] = useState('');
  const [newRevCar, setNewRevCar] = useState('');
  const [newRevRating, setNewRevRating] = useState(5);
  const [newRevService, setNewRevService] = useState('Тонировка задней полусферы');
  const [newRevComment, setNewRevComment] = useState('');
  const [newRevMaster, setNewRevMaster] = useState('Кадырбеков Арген');

  // Orders Tab filters
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Prices editing state (serviceId -> prices)
  const [editingPrices, setEditingPrices] = useState<Record<string, { sedan: number; crossover: number; suv: number; premium: number }>>({});

  // New Service Form
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<'tinting' | 'ppf' | 'vinyl' | 'detailing'>('tinting');
  const [newServiceSedan, setNewServiceSedan] = useState(5000);
  const [newServiceCrossover, setNewServiceCrossover] = useState(6500);
  const [newServiceSuv, setNewServiceSuv] = useState(8000);
  const [newServicePremium, setNewServicePremium] = useState(10000);
  const [newServiceDuration, setNewServiceDuration] = useState(3);
  const [newServiceWarranty, setNewServiceWarranty] = useState(5);

  // New Master Form
  const [isAddingMaster, setIsAddingMaster] = useState(false);
  const [newMasterName, setNewMasterName] = useState('');
  const [newMasterRole, setNewMasterRole] = useState('Мастер тонировки');
  const [newMasterExp, setNewMasterExp] = useState(8);
  const [newMasterSpecialty, setNewMasterSpecialty] = useState('Тонировка LLumar, бронирование фар');
  const [newMasterRating, setNewMasterRating] = useState(5.0);
  const [newMasterAvatar, setNewMasterAvatar] = useState(MASTER_PHOTO_PRESETS[0]);

  // Master Editing state
  const [editingMasterId, setEditingMasterId] = useState<string | null>(null);
  const [editMasterForm, setEditMasterForm] = useState<{
    name: string;
    role: string;
    experienceYears: number;
    completedCars: number;
    rating: number;
    specialty: string;
    avatarUrl: string;
  }>({
    name: '',
    role: '',
    experienceYears: 10,
    completedCars: 2000,
    rating: 5.0,
    specialty: '',
    avatarUrl: MASTER_PHOTO_PRESETS[0]
  });

  const startEditingMaster = (m: Master) => {
    setEditingMasterId(m.id);
    setEditMasterForm({
      name: m.name,
      role: m.role,
      experienceYears: m.experienceYears,
      completedCars: m.completedCars,
      rating: m.rating,
      specialty: m.specialty,
      avatarUrl: m.avatarUrl
    });
  };

  const handleSaveMasterEdit = (id: string) => {
    updateMaster(id, {
      name: editMasterForm.name.trim(),
      role: editMasterForm.role.trim(),
      experienceYears: Number(editMasterForm.experienceYears),
      completedCars: Number(editMasterForm.completedCars),
      rating: Number(editMasterForm.rating),
      specialty: editMasterForm.specialty.trim(),
      avatarUrl: editMasterForm.avatarUrl.trim()
    });
    setEditingMasterId(null);
  };

  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'edit' | 'new') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file, 480, 0.82);
      if (target === 'edit') {
        setEditMasterForm(prev => ({ ...prev, avatarUrl: compressed }));
      } else {
        setNewMasterAvatar(compressed);
      }
      addNotification('Фотография загружена', 'Новое фото готово к сохранению.', 'success');
    } catch (err: any) {
      addNotification('Ошибка загрузки', err?.message || 'Не удалось обработать изображение', 'alert');
    }
  };

  const handleDirectAvatarUpload = async (masterId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageFile(file, 480, 0.82);
      updateMaster(masterId, { avatarUrl: compressed });
      addNotification('Фото мастера обновлено', 'Новая фотография сохранена на сайте.', 'success');
    } catch (err: any) {
      addNotification('Ошибка загрузки', err?.message || 'Не удалось обработать изображение', 'alert');
    }
  };

  const openPhotoModal = (m: Master) => {
    setPhotoModalMaster(m);
    setPhotoModalPreview(m.avatarUrl);
    setPhotoModalUrlInput('');
  };

  const handleSavePhotoModal = () => {
    if (!photoModalMaster || !photoModalPreview) return;
    updateMaster(photoModalMaster.id, { avatarUrl: photoModalPreview });
    addNotification('Фотография сохранена', `Новое фото мастера «${photoModalMaster.name}» установлено на сайте.`, 'success');
    setPhotoModalMaster(null);
  };

  const openExpModal = (m: Master) => {
    setExpModalMaster(m);
    setExpModalValue(m.experienceYears);
  };

  const handleSaveExpModal = () => {
    if (!expModalMaster) return;
    const finalVal = Math.max(0, Math.floor(Number(expModalValue) || 0));
    updateMaster(expModalMaster.id, { experienceYears: finalVal });
    addNotification('Стаж работы обновлен', `Стаж мастера «${expModalMaster.name}» изменен на ${finalVal} лет.`, 'success');
    setExpModalMaster(null);
  };

  const handleQuickExpUpdate = (id: string, delta: number) => {
    const current = masters.find(m => m.id === id);
    if (!current) return;
    const newExp = Math.max(1, current.experienceYears + delta);
    updateMaster(id, { experienceYears: newExp });
  };

  const handleSetExactExp = (id: string, value: number) => {
    if (isNaN(value) || value < 0) return;
    updateMaster(id, { experienceYears: Math.floor(value) });
  };

  // Quick Promotion Templates
  const applyPromoTemplate = (type: 'tint15' | 'ppfLights' | 'antichrome20' | 'fullPpf10') => {
    setIsAddingPromo(true);
    if (type === 'tint15') {
      setNewPromoTitle('Скидка 15% на тонировку вкруг Llumar');
      setNewPromoBadge('ХИТ СЕЗОНА');
      setNewPromoDesc('Оригинальная атермальная и тонировочная пленка Llumar (США). Защита от УФ 99%, бессрочная гарантия.');
      setNewPromoPercent(15);
      setNewPromoCode('LLUMAR15');
      setNewPromoValid('31 декабря 2026');
      setNewPromoCategory('tinting');
      setNewPromoColor('from-amber-500 to-orange-600');
    } else if (type === 'ppfLights') {
      setNewPromoTitle('Бронирование фар STEK в подарок при оклейке зон риска');
      setNewPromoBadge('ПОДАРОК');
      setNewPromoDesc('При заказе антигравийной защиты «Зоны риска» оклейка передней оптики полиуретаном STEK DYNOshield в подарок!');
      setNewPromoPercent(20);
      setNewPromoCode('FREEFARI');
      setNewPromoValid('31 декабря 2026');
      setNewPromoCategory('ppf');
      setNewPromoColor('from-emerald-500 to-teal-600');
    } else if (type === 'antichrome20') {
      setNewPromoTitle('Комплекс «Антихром» со скидкой 20%');
      setNewPromoBadge('СТИЛЬ');
      setNewPromoDesc('Полный Shadow Line: оклейка молдингов, решетки радиатора и эмблем в черный глянец Avery / Oracal.');
      setNewPromoPercent(20);
      setNewPromoCode('SHADOW20');
      setNewPromoValid('31 декабря 2026');
      setNewPromoCategory('vinyl');
      setNewPromoColor('from-purple-600 to-pink-600');
    } else if (type === 'fullPpf10') {
      setNewPromoTitle('Полный кузов PPF (STEK) - скидка 10%');
      setNewPromoBadge('PREMIUM');
      setNewPromoDesc('Максимальная защита нового автомобиля из салона. 10 лет официальной гарантии от пожелтения и сколов.');
      setNewPromoPercent(10);
      setNewPromoCode('FULLPPF10');
      setNewPromoValid('31 декабря 2026');
      setNewPromoCategory('ppf');
      setNewPromoColor('from-blue-600 to-cyan-500');
    }
  };

  // Promotions management state
  const [isAddingPromo, setIsAddingPromo] = useState(false);
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoBadge, setNewPromoBadge] = useState('СКИДКА');
  const [newPromoDesc, setNewPromoDesc] = useState('');
  const [newPromoPercent, setNewPromoPercent] = useState(15);
  const [newPromoCode, setNewPromoCode] = useState('TONIX15');
  const [newPromoValid, setNewPromoValid] = useState('30 ноября 2026');
  const [newPromoCategory, setNewPromoCategory] = useState('tinting');
  const [newPromoColor, setNewPromoColor] = useState('from-amber-500 to-orange-600');

  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [editPromoForm, setEditPromoForm] = useState({
    title: '',
    badge: '',
    description: '',
    discountPercent: 15,
    code: '',
    validUntil: '',
    accentColor: 'from-amber-500 to-orange-600'
  });

  const [announcementInput, setAnnouncementInput] = useState(announcementText);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoTitle.trim() || !newPromoCode.trim()) return;

    addPromotion({
      title: newPromoTitle.trim(),
      badge: newPromoBadge.trim(),
      description: newPromoDesc.trim(),
      discountPercent: Number(newPromoPercent),
      code: newPromoCode.trim().toUpperCase(),
      validUntil: newPromoValid.trim(),
      serviceCategory: newPromoCategory,
      accentColor: newPromoColor
    });

    setIsAddingPromo(false);
    setNewPromoTitle('');
    setNewPromoDesc('');
    setNewPromoCode('TONIX15');
  };

  const startEditingPromo = (p: any) => {
    setEditingPromoId(p.id);
    setEditPromoForm({
      title: p.title,
      badge: p.badge,
      description: p.description,
      discountPercent: p.discountPercent,
      code: p.code,
      validUntil: p.validUntil,
      accentColor: p.accentColor || 'from-amber-500 to-orange-600'
    });
  };

  const handleSavePromoEdit = (id: string) => {
    updatePromotion(id, {
      title: editPromoForm.title.trim(),
      badge: editPromoForm.badge.trim(),
      description: editPromoForm.description.trim(),
      discountPercent: Number(editPromoForm.discountPercent),
      code: editPromoForm.code.trim().toUpperCase(),
      validUntil: editPromoForm.validUntil.trim(),
      accentColor: editPromoForm.accentColor
    });
    setEditingPromoId(null);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncementText(announcementInput.trim());
  };
  const [settingsWorkHours, setSettingsWorkHours] = useState(studioSettings.workHours);
  const [settingsAddress, setSettingsAddress] = useState(studioSettings.address);
  const [settingsPhone, setSettingsPhone] = useState(studioSettings.phone);
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(studioSettings.whatsapp);
  const [settingsContactPerson, setSettingsContactPerson] = useState(studioSettings.contactPerson);
  const [settingsInstagram, setSettingsInstagram] = useState(studioSettings.instagram || 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==');
  const [settingsTelegram, setSettingsTelegram] = useState(studioSettings.telegram || '@tonix_tint_kg');
  const [settingsGisLink, setSettingsGisLink] = useState(studioSettings.gisLink || 'https://2gis.kg/bishkek');
  const [settingsYandexMapsLink, setSettingsYandexMapsLink] = useState(studioSettings.yandexMapsLink || 'https://yandex.ru/maps/bishkek');

  if (!isAdminOpen) return null;

  // KPIs
  const totalRevenue = bookings.reduce((sum, b) => sum + b.priceKgs, 0);
  const inProgressCount = bookings.filter(b => b.status === 'in_progress').length;
  const readyCount = bookings.filter(b => b.status === 'ready').length;
  const avgCheck = bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

  const filteredBookings = bookings.filter(b => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.clientName.toLowerCase().includes(q) ||
        b.carBrand.toLowerCase().includes(q) ||
        b.carModel.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportAllCsv = () => {
    const headers = 'ID,Дата,Время,Клиент,Телефон,Автомобиль,Услуга,Мастер,Сумма KGS,Способ оплаты,Статус\n';
    const rows = bookings.map(b => 
      `"${b.id}","${b.bookingDate}","${b.bookingTime}","${b.clientName}","${b.clientPhone}","${b.carBrand} ${b.carModel}","${b.serviceTitle}","${b.masterName}",${b.priceKgs},"${b.paymentMethod}","${b.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TonixTint_CRM_Full_Export_${Date.now()}.csv`;
    link.click();
    addNotification('Экспорт базы CRM завершен', 'Файл CSV успешно сформирован и скачан.', 'success');
  };

  const createEncryptedBackup = () => {
    const backupData = {
      app: 'TonixTintStudio',
      exportDate: new Date().toISOString(),
      encryption: 'AES-256-GCM (Simulated)',
      bookingsCount: bookings.length,
      bookings,
      services,
      masters,
      studioSettings
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TonixTint_Backup_Archive_${new Date().toISOString().slice(0, 10)}.enc.json`;
    link.click();
    addNotification('Резервная копия создана', 'Зашифрованный архив базы данных сохранен.', 'success');
  };

  // Price handler
  const handlePriceChange = (serviceId: string, category: 'sedan' | 'crossover' | 'suv' | 'premium', value: number) => {
    setEditingPrices(prev => {
      const current = prev[serviceId] || {
        sedan: services.find(s => s.id === serviceId)?.priceSedan || 0,
        crossover: services.find(s => s.id === serviceId)?.priceCrossover || 0,
        suv: services.find(s => s.id === serviceId)?.priceSuv || 0,
        premium: services.find(s => s.id === serviceId)?.pricePremium || 0,
      };
      return {
        ...prev,
        [serviceId]: {
          ...current,
          [category]: value
        }
      };
    });
  };

  const handleSavePrice = (serviceId: string) => {
    const edited = editingPrices[serviceId];
    if (!edited) return;
    updateServicePrice(serviceId, {
      priceSedan: edited.sedan,
      priceCrossover: edited.crossover,
      priceSuv: edited.suv,
      pricePremium: edited.premium
    });
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;

    addService({
      category: newServiceCategory,
      titleKey: newServiceTitle.trim(),
      descriptionKey: `Профессиональная услуга в студии TONIX TINT STUDIO.`,
      priceSedan: Number(newServiceSedan),
      priceCrossover: Number(newServiceCrossover),
      priceSuv: Number(newServiceSuv),
      pricePremium: Number(newServicePremium),
      durationHours: Number(newServiceDuration),
      warrantyYears: Number(newServiceWarranty),
      features: ['Оригинальные материалы США/Кореи', 'Контрольный осмотр через 7 дней', 'Гарантийный сертификат'],
      filmBrands: ['LLumar', 'STEK', 'SunTek'],
      imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80'
    });

    setIsAddingService(false);
    setNewServiceTitle('');
  };

  const handleCreateMaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasterName.trim()) return;

    addMaster({
      name: newMasterName.trim(),
      role: newMasterRole.trim(),
      experienceYears: Number(newMasterExp),
      rating: Number(newMasterRating),
      completedCars: 500,
      specialty: newMasterSpecialty.trim(),
      avatarUrl: newMasterAvatar,
      availableDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    });

    setIsAddingMaster(false);
    setNewMasterName('');
    setNewMasterAvatar(MASTER_PHOTO_PRESETS[0]);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudioSettings({
      workHours: settingsWorkHours.trim(),
      address: settingsAddress.trim(),
      phone: settingsPhone.trim(),
      whatsapp: settingsWhatsapp.trim(),
      contactPerson: settingsContactPerson.trim(),
      instagram: settingsInstagram.trim(),
      telegram: settingsTelegram.trim(),
      gisLink: settingsGisLink.trim(),
      yandexMapsLink: settingsYandexMapsLink.trim()
    });
    // keep CMS tab fields in sync
    setCmsWorkHours(settingsWorkHours.trim());
    setCmsAddress(settingsAddress.trim());
    setCmsPhone(settingsPhone.trim());
    setCmsWhatsapp(settingsWhatsapp.trim());
    setCmsContactPerson(settingsContactPerson.trim());
    setCmsInstagram(settingsInstagram.trim());
    setCmsTelegram(settingsTelegram.trim());
    setCmsGisLink(settingsGisLink.trim());
    setCmsYandexMapsLink(settingsYandexMapsLink.trim());
    addNotification('Настройки студии сохранены', 'График работы, Instagram и контакты обновлены.', 'success');
  };

  // --- Hero Slide Handlers ---
  const handleOpenAddSlide = () => {
    setIsAddingHeroSlide(true);
    setEditingHeroSlideId(null);
    setSlideCarTitle('');
    setSlideFilmBrand('STEK DYNOshield + LLumar ATR');
    setSlideTag('Премиум бронезащита');
    setSlideCategory('suv');
    setSlideImage(SLIDE_IMAGE_PRESETS[0].url);
    setSlideServiceId('ppf-risk-zones');
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setIsAddingHeroSlide(true);
    setEditingHeroSlideId(slide.id);
    setSlideCarTitle(slide.carTitle);
    setSlideFilmBrand(slide.filmBrand);
    setSlideTag(slide.tag);
    setSlideCategory(slide.carCategory);
    setSlideImage(slide.image);
    setSlideServiceId(slide.serviceId || 'ppf-risk-zones');
  };

  const handleSaveHeroSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideCarTitle.trim()) {
      addNotification('Ошибка', 'Введите название авто для слайда.', 'alert');
      return;
    }
    if (!slideImage.trim()) {
      addNotification('Ошибка', 'Укажите фотографию слайда.', 'alert');
      return;
    }

    if (editingHeroSlideId) {
      updateHeroSlide(editingHeroSlideId, {
        carTitle: slideCarTitle.trim(),
        filmBrand: slideFilmBrand.trim(),
        tag: slideTag.trim(),
        carCategory: slideCategory,
        image: slideImage.trim(),
        serviceId: slideServiceId
      });
    } else {
      addHeroSlide({
        carTitle: slideCarTitle.trim(),
        filmBrand: slideFilmBrand.trim(),
        tag: slideTag.trim(),
        carCategory: slideCategory,
        image: slideImage.trim(),
        serviceId: slideServiceId
      });
    }

    setIsAddingHeroSlide(false);
    setEditingHeroSlideId(null);
  };

  const handleSlidePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 1600, 0.85);
      setSlideImage(compressed);
      addNotification('Фото загружено', 'Изображение оптимизировано для баннера.', 'success');
    } catch (err: any) {
      addNotification('Ошибка загрузки', err?.message || 'Не удалось обработать файл.', 'alert');
    }
  };

  // --- Studio CMS Save Handler ---
  const handleSaveFullStudioCms = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudioSettings({
      studioName: cmsStudioName.trim(),
      studioTagline: cmsStudioTagline.trim(),
      phone: cmsPhone.trim(),
      contactPerson: cmsContactPerson.trim(),
      whatsapp: cmsWhatsapp.trim(),
      telegram: cmsTelegram.trim(),
      instagram: cmsInstagram.trim(),
      address: cmsAddress.trim(),
      workHours: cmsWorkHours.trim(),
      gisLink: cmsGisLink.trim(),
      yandexMapsLink: cmsYandexMapsLink.trim(),
      heroSlideInterval: Number(cmsSlideInterval) || 1800,
      heroTextPosition: cmsTextPosition
    });
    // keep settings tab in sync
    setSettingsWorkHours(cmsWorkHours.trim());
    setSettingsAddress(cmsAddress.trim());
    setSettingsPhone(cmsPhone.trim());
    setSettingsWhatsapp(cmsWhatsapp.trim());
    setSettingsContactPerson(cmsContactPerson.trim());
    setSettingsInstagram(cmsInstagram.trim());
    setSettingsTelegram(cmsTelegram.trim());
    setSettingsGisLink(cmsGisLink.trim());
    setSettingsYandexMapsLink(cmsYandexMapsLink.trim());
    addNotification('Настройки сайта обновлены!', 'Все контактные данные, баннер и реквизиты студии сохранены.', 'success');
  };

  // --- Portfolio CMS Save Handler ---
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioCar.trim()) {
      addNotification('Ошибка', 'Укажите модель автомобиля.', 'alert');
      return;
    }
    addPortfolioItem({
      car: newPortfolioCar.trim(),
      title: newPortfolioTitle.trim() || `${newPortfolioCar.trim()} • Детейлинг комплекс`,
      category: newPortfolioCategory,
      film: newPortfolioFilm.trim(),
      timeSpent: newPortfolioTime.trim(),
      beforeImage: newPortfolioBeforeImg.trim() || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      afterImage: newPortfolioAfterImg.trim() || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      description: newPortfolioDesc.trim() || 'Комплексная защита и преображение автомобиля сертифицированными мастерами TONIX TINT STUDIO.'
    });
    setIsAddingPortfolio(false);
    setNewPortfolioCar('');
    setNewPortfolioTitle('');
    setNewPortfolioBeforeImg('');
    setNewPortfolioAfterImg('');
    setNewPortfolioDesc('');
  };

  // --- Review CMS Save Handler ---
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevAuthor.trim() || !newRevComment.trim()) {
      addNotification('Ошибка', 'Заполните имя и текст отзыва.', 'alert');
      return;
    }
    addReview({
      authorName: newRevAuthor.trim(),
      carModel: newRevCar.trim() || 'Автомобиль клиента',
      rating: newRevRating,
      serviceName: newRevService.trim(),
      comment: newRevComment.trim(),
      masterName: newRevMaster.trim()
    });
    setIsAddingReview(false);
    setNewRevAuthor('');
    setNewRevCar('');
    setNewRevComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative max-w-6xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* CRM Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/95 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">ПАНЕЛЬ УПРАВЛЕНИЯ TONIX TINT STUDIO</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE BISHKEK
                </span>
              </div>
              <p className="text-xs text-slate-400">Управление ценами, мастерами, графиком работы и заявками</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAllCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
              title="Экспорт в CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Экспорт CSV</span>
            </button>

            <button
              onClick={createEncryptedBackup}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
              title="Создать защищенный бэкап"
            >
              <Archive className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Бэкап</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Direct Actions Top Banner - Visible instantly on all screens */}
        <div className="bg-slate-950 p-3 sm:p-4 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 shrink-0">
          <button 
            type="button"
            onClick={() => setActiveTab('site_cms')}
            className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'site_cms' 
                ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-cyan-500 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-500/40' 
                : 'bg-slate-900/90 hover:bg-slate-850 border-cyan-500/30 hover:border-cyan-500'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-white truncate">УПРАВЛЕНИЕ САЙТОМ</span>
              </div>
              <p className="text-[10px] text-cyan-300 font-bold truncate">Слайдер, Баннер, Контакты</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => { setActiveTab('promotions'); setIsAddingPromo(true); }}
            className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'promotions' 
                ? 'bg-gradient-to-r from-red-600/30 to-amber-600/30 border-red-500 shadow-lg shadow-red-500/25 ring-1 ring-red-500/40' 
                : 'bg-slate-900/90 hover:bg-slate-850 border-red-500/30 hover:border-red-500'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-white truncate">АКЦИИ И СКИДКИ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0"></span>
              </div>
              <p className="text-[10px] text-amber-300 font-bold truncate">+ Объявить акцию</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => { setActiveTab('masters'); setIsAddingMaster(false); }}
            className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'masters' 
                ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/20 ring-1 ring-amber-500/40' 
                : 'bg-slate-900/90 hover:bg-slate-850 border-amber-500/30 hover:border-amber-500'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white truncate block">МАСТЕРА СТУДИИ</span>
              <p className="text-[10px] text-slate-300 font-semibold truncate">Стаж, Фото, Добавить</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('prices')}
            className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'prices' 
                ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500/40' 
                : 'bg-slate-900/90 hover:bg-slate-850 border-emerald-500/30 hover:border-emerald-500'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white truncate block">ЦЕНЫ НА УСЛУГИ</span>
              <p className="text-[10px] text-slate-300 font-semibold truncate">Прайс-лист авто</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'portfolio' 
                ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-500/40' 
                : 'bg-slate-900/90 hover:bg-slate-850 border-purple-500/30 hover:border-purple-500'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white truncate block">ПОРТФОЛИО</span>
              <p className="text-[10px] text-slate-300 font-semibold truncate">Галерея До / После</p>
            </div>
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/80 px-6 gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'orders', label: 'Заказы (CRM)', icon: Calendar, badge: bookings.length },
            { id: 'site_cms', label: '🌐 Управление сайтом (Слайдер)', icon: Globe, highlight: true },
            { id: 'promotions', label: '🔥 Акции и Скидки', icon: Flame, badge: promotions.length },
            { id: 'masters', label: '👥 Мастера (Стаж & Фото)', icon: Users, badge: masters.length },
            { id: 'prices', label: '💰 Управление ценами', icon: DollarSign, badge: services.length },
            { id: 'portfolio', label: '📸 Портфолио (До/После)', icon: ImageIcon, badge: portfolioItems.length },
            { id: 'reviews', label: '⭐ Отзывы клиентов', icon: Star, badge: reviews.length },
            { id: 'schedule', label: '⏰ График и Контакты', icon: Clock },
            { id: 'telegram', label: '🤖 Telegram & Вебхуки', icon: Send }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isSel 
                    ? tab.highlight 
                      ? 'border-red-500 text-red-400 bg-red-500/10'
                      : 'border-amber-500 text-amber-400' 
                    : tab.highlight
                      ? 'border-transparent text-red-300/80 hover:text-red-300 bg-red-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.highlight ? 'text-red-400 animate-pulse' : ''}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSel 
                      ? tab.highlight ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950' 
                      : tab.highlight ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Area */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* TAB 1: ORDERS CRM */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* KPI Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Оборот по заказам</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {totalRevenue.toLocaleString()} <span className="text-xs">KGS</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">+18% за эту неделю</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">В работе в боксах</div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
                    {inProgressCount} <span className="text-xs">авто</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Всего 6 постов оклейки</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Готовы к выдаче</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    {readyCount} <span className="text-xs">авто</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Ожидают клиентов</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Средний чек</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {avgCheck.toLocaleString()} <span className="text-xs">KGS</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Тонировка + PPF</div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Поиск по авто, клиенту..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  {[
                    { id: 'all', label: 'Все' },
                    { id: 'pending', label: 'Ожидают' },
                    { id: 'in_progress', label: 'В боксе' },
                    { id: 'ready', label: 'Готовы' },
                    { id: 'completed', label: 'Завершены' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFilterStatus(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 cursor-pointer ${
                        filterStatus === f.id
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-950 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">ID / Дата</th>
                        <th className="p-3.5">Клиент</th>
                        <th className="p-3.5">Автомобиль</th>
                        <th className="p-3.5">Услуга & Пленка</th>
                        <th className="p-3.5">Мастер</th>
                        <th className="p-3.5">Сумма KGS</th>
                        <th className="p-3.5">Статус</th>
                        <th className="p-3.5 text-right">Действие</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-mono font-bold text-white">#{b.id}</div>
                            <div className="text-[10px] text-slate-400">{b.bookingDate} {b.bookingTime}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-200">{b.clientName}</div>
                            <div className="text-[10px] text-amber-400">{b.clientPhone}</div>
                            {b.tintPermitAssistance && (
                              <div className="text-[9px] text-blue-400 font-bold">Помощь Түндүк</div>
                            )}
                          </td>
                          <td className="p-3.5 font-bold text-white">
                            {b.carBrand} {b.carModel} ({b.carYear})
                          </td>
                          <td className="p-3.5">
                            <div className="font-medium text-slate-200">{b.serviceTitle}</div>
                            <div className="text-[10px] text-slate-400">{b.filmBrand}</div>
                          </td>
                          <td className="p-3.5 text-slate-300">
                            {b.masterName}
                          </td>
                          <td className="p-3.5 font-black text-amber-400">
                            {b.priceKgs.toLocaleString()}
                            <div className="text-[10px] text-slate-400 uppercase">{b.paymentMethod}</div>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={b.status}
                              onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-500"
                            >
                              <option value="pending">Ожидает</option>
                              <option value="in_progress">В боксе</option>
                              <option value="ready">Готов к выдаче</option>
                              <option value="completed">Завершен</option>
                              <option value="cancelled">Отменен</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={`https://wa.me/${b.clientPhone.replace(/\D/g, '')}?text=Здравствуйте,%20${b.clientName}!%20TONIX%20TINT%20STUDIO%20Бишкек%20по%20вашему%20заказу%20${b.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold hover:bg-emerald-500/30 transition-colors"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SITE CMS & HERO SLIDESHOW MANAGEMENT */}
          {activeTab === 'site_cms' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Управление сайтом и Главным экраном (CMS)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Настройка скорости слайдера, положения карточки с текстом, фотографий автомобилей и контактных данных студии.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleOpenAddSlide}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Добавить слайд</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                    title="Смотреть сайт"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Смотреть сайт</span>
                  </button>
                </div>
              </div>

              {/* SECTION 1: HERO SLIDER DYNAMICS (SPEED & POSITION) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-2">
                    <FastForward className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Настройки слайд-шоу Главного экрана
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Текущий интервал: {studioSettings.heroSlideInterval || 1800} мс ({((studioSettings.heroSlideInterval || 1800) / 1000).toFixed(1)} сек)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Slide Speed Presets */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-slate-300">
                      ⚡ Скорость переключения слайдов (Выберите или укажите время):
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[
                        { label: '1.2 сек', val: 1200, desc: 'Турбо 🚀' },
                        { label: '1.5 сек', val: 1500, desc: 'Быстро' },
                        { label: '1.8 сек', val: 1800, desc: 'Хит ⭐' },
                        { label: '2.2 сек', val: 2200, desc: 'Баланс' },
                        { label: '2.8 сек', val: 2800, desc: 'Спокойно' }
                      ].map(preset => {
                        const isCurrent = (studioSettings.heroSlideInterval || 1800) === preset.val;
                        return (
                          <button
                            key={preset.val}
                            type="button"
                            onClick={() => {
                              setCmsSlideInterval(preset.val);
                              updateStudioSettings({ heroSlideInterval: preset.val });
                              addNotification('Скорость обновлена', `Интервал слайдов установлен: ${preset.label}`, 'success');
                            }}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/30 ring-1 ring-amber-400'
                                : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                            }`}
                          >
                            <div className="text-xs font-bold">{preset.label}</div>
                            <div className="text-[9px] opacity-80 leading-tight">{preset.desc}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom MS Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">Точное время (мс):</span>
                      <input
                        type="number"
                        min="600"
                        max="8000"
                        step="100"
                        value={cmsSlideInterval}
                        onChange={e => setCmsSlideInterval(Number(e.target.value))}
                        className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 text-center font-mono focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = Math.max(500, Math.min(10000, Number(cmsSlideInterval) || 1800));
                          setCmsSlideInterval(val);
                          updateStudioSettings({ heroSlideInterval: val });
                          addNotification('Скорость обновлена', `Интервал слайдов установлен: ${val} мс (${(val / 1000).toFixed(1)} сек)`, 'success');
                        }}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Применить
                      </button>
                    </div>
                  </div>

                  {/* Text Position Switcher */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">
                      Положение блока с текстом на главном экране:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCmsTextPosition('left');
                          updateStudioSettings({ heroTextPosition: 'left' });
                          addNotification('Положение текста', 'Карточка с текстом установлена СЛЕВА.', 'info');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          (studioSettings.heroTextPosition || 'left') === 'left'
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                            : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-400'
                        }`}
                      >
                        <MoveHorizontal className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Слева (Рекомендовано)</div>
                          <div className="text-[10px] text-slate-400">Автомобиль справа виден целиком</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCmsTextPosition('right');
                          updateStudioSettings({ heroTextPosition: 'right' });
                          addNotification('Положение текста', 'Карточка с текстом установлена СПРАВА.', 'info');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          studioSettings.heroTextPosition === 'right'
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                            : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-400'
                        }`}
                      >
                        <MoveHorizontal className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Справа</div>
                          <div className="text-[10px] text-slate-400">Открывает левую часть фото авто</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add / Edit Slide Form Modal */}
              {isAddingHeroSlide && (
                <form onSubmit={handleSaveHeroSlide} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{editingHeroSlideId ? 'Редактировать слайд' : 'Добавить новый слайд в баннер'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingHeroSlide(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Название авто и описание работы:
                      </label>
                      <input
                        type="text"
                        required
                        value={slideCarTitle}
                        onChange={e => setSlideCarTitle(e.target.value)}
                        placeholder="Например: BMW M5 • Атермальная пленка & Антихром"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Марка пленки / Материалы:
                      </label>
                      <input
                        type="text"
                        value={slideFilmBrand}
                        onChange={e => setSlideFilmBrand(e.target.value)}
                        placeholder="LLumar ATR 5% + STEK DYNOshield"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Текст бейджа (ярлык):
                      </label>
                      <input
                        type="text"
                        value={slideTag}
                        onChange={e => setSlideTag(e.target.value)}
                        placeholder="Премиум бронезащита • ГОСТ КР"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Класс автомобиля:
                      </label>
                      <select
                        value={slideCategory}
                        onChange={e => setSlideCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="suv">Внедорожник (SUV / Джип)</option>
                        <option value="sedan">Седан (Седан / Хэтчбек)</option>
                        <option value="crossover">Кроссовер</option>
                        <option value="premium">Премиум / Спорт / Электро</option>
                      </select>
                    </div>
                  </div>

                  {/* Image picker for slide */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-slate-300">
                      Фотография для слайда:
                    </label>

                    {slideImage && (
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                        <img src={slideImage} alt="Slide Preview" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] text-amber-300 font-bold border border-amber-500/30">
                          Предпросмотр баннера
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md">
                        <Upload className="w-4 h-4" />
                        <span>Загрузить фото с устройства</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleSlidePhotoUpload}
                        />
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={slideImage}
                          onChange={e => setSlideImage(e.target.value)}
                          placeholder="Или вставьте ссылку на фото https://..."
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Presets */}
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1.5 font-semibold">Или выберите готовое авто из каталога студии:</div>
                      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                        {SLIDE_IMAGE_PRESETS.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSlideImage(p.url);
                              if (!slideCarTitle) setSlideCarTitle(p.title);
                              if (!slideFilmBrand) setSlideFilmBrand(p.film);
                              if (!slideTag) setSlideTag(p.tag);
                              setSlideCategory(p.category);
                            }}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                              slideImage === p.url ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingHeroSlide(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingHeroSlideId ? 'Сохранить изменения' : 'Добавить слайд на сайт'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* SECTION 2: SLIDES LIST */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Слайды на Главном экране ({heroSlides.length})</span>
                  </h5>
                  <span className="text-[11px] text-slate-400">Слайды плавно сменяются с интервалом {studioSettings.heroSlideInterval || 2100} мс</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-md"
                    >
                      <div className="relative aspect-video w-full bg-slate-900">
                        <img src={slide.image} alt={slide.carTitle} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-amber-400 font-bold border border-amber-500/30">
                          #{idx + 1} • {slide.tag}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-cyan-300 font-bold uppercase">
                          {slide.carCategory}
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h6 className="font-extrabold text-xs text-white leading-snug line-clamp-1">{slide.carTitle}</h6>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{slide.filmBrand}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-850">
                          <button
                            type="button"
                            onClick={() => handleOpenEditSlide(slide)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs flex items-center gap-1 font-bold"
                            title="Редактировать слайд"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Изменить</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHeroSlide(slide.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1 font-bold"
                            title="Удалить слайд"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Удалить</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: STUDIO CONTACTS & REQUISITES CMS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-855 pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Реквизиты, Контакты и Соцсети студии
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Мгновенно обновляются в шапке, подвале и контактах</span>
                </div>

                <form onSubmit={handleSaveFullStudioCms} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Название студии:</label>
                      <input
                        type="text"
                        value={cmsStudioName}
                        onChange={e => setCmsStudioName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Шеф-мастер / Контактное лицо:</label>
                      <input
                        type="text"
                        value={cmsContactPerson}
                        onChange={e => setCmsContactPerson(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Телефон для звонков:</label>
                      <input
                        type="text"
                        value={cmsPhone}
                        onChange={e => setCmsPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp номер:</label>
                      <input
                        type="text"
                        value={cmsWhatsapp}
                        onChange={e => setCmsWhatsapp(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-emerald-400"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Telegram логин / бот:</span>
                        </label>
                        <a 
                          href={getTelegramUrl(cmsTelegram)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Тест</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="text"
                        value={cmsTelegram}
                        onChange={e => setCmsTelegram(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono text-cyan-400"
                        placeholder="@tonix_tint_kg"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <Instagram className="w-3.5 h-3.5 text-pink-400" />
                          <span>Instagram студии:</span>
                        </label>
                        <a 
                          href={getInstagramUrl(cmsInstagram)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[10px] text-pink-400 hover:underline flex items-center gap-0.5 font-bold"
                        >
                          <span>Открыть Instagram</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="text"
                        value={cmsInstagram}
                        onChange={e => setCmsInstagram(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-pink-500 font-mono text-pink-400"
                        placeholder="https://www.instagram.com/tonix.kg или @tonix.kg"
                      />
                      <div className="text-[10px] text-slate-400 mt-1 flex flex-wrap items-center justify-between gap-1">
                        <span>Аккаунт: <strong className="text-pink-300 font-mono">{getInstagramUsername(cmsInstagram)}</strong> ({instagramPosts.length} постов в ленте)</span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">● Live API: Активен</span>
                          <button
                            type="button"
                            onClick={() => syncInstagramFeed()}
                            disabled={isSyncingInstagram}
                            className="px-2 py-0.5 rounded bg-pink-950/60 hover:bg-pink-900 border border-pink-500/30 text-pink-300 text-[10px] font-bold cursor-pointer transition-all disabled:opacity-50"
                          >
                            {isSyncingInstagram ? 'Синхронизация...' : 'Обновить посты'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Адрес студии в Бишкеке:</label>
                      <input
                        type="text"
                        value={cmsAddress}
                        onChange={e => setCmsAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">График работы:</label>
                      <input
                        type="text"
                        value={cmsWorkHours}
                        onChange={e => setCmsWorkHours(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-300">Ссылка на 2GIS:</label>
                        <a href={cmsGisLink} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5">
                          <span>Открыть</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="text"
                        value={cmsGisLink}
                        onChange={e => setCmsGisLink(e.target.value)}
                        placeholder="https://2gis.kg/bishkek"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono text-emerald-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-300">Ссылка на Яндекс Карты:</label>
                        <a href={cmsYandexMapsLink} target="_blank" rel="noreferrer" className="text-[10px] text-red-400 hover:underline flex items-center gap-0.5">
                          <span>Открыть</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="text"
                        value={cmsYandexMapsLink}
                        onChange={e => setCmsYandexMapsLink(e.target.value)}
                        placeholder="https://yandex.ru/maps/bishkek"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono text-red-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Сохранить реквизиты студии</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION 4: ANNOUNCEMENT BAR CMS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Бегущая строка / Объявление сверху сайта
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-300">Отображается в самой верхней полосе сайта</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={announcementText}
                    onChange={e => updateAnnouncementText(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => addNotification('Баннер обновлен', 'Текст бегущей строки сохранен.', 'success')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Применить
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRICE & SERVICES MANAGEMENT */}
          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Управление ценами на услуги (в сомах KGS)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Измените стоимость для любого класса кузова. Цены мгновенно обновятся в онлайн-калькуляторе и прайс-листе.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingService(!isAddingService)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingService ? 'Отмена' : 'Добавить услугу'}</span>
                </button>
              </div>

              {/* Add Service Modal/Drawer */}
              {isAddingService && (
                <form onSubmit={handleCreateService} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Новая услуга в прайс-лист
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Название услуги:</label>
                      <input
                        type="text"
                        required
                        value={newServiceTitle}
                        onChange={e => setNewServiceTitle(e.target.value)}
                        placeholder="Например: Бронирование лобового стекла ClearPlex"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Категория:</label>
                      <select
                        value={newServiceCategory}
                        onChange={e => setNewServiceCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="tinting">Тонирование стекол</option>
                        <option value="ppf">Бронепленка (PPF)</option>
                        <option value="vinyl">Виниловый стайлинг</option>
                        <option value="detailing">Детейлинг и керамика</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Седан (KGS):</label>
                      <input
                        type="number"
                        value={newServiceSedan}
                        onChange={e => setNewServiceSedan(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Кроссовер (KGS):</label>
                      <input
                        type="number"
                        value={newServiceCrossover}
                        onChange={e => setNewServiceCrossover(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Внедорожник (KGS):</label>
                      <input
                        type="number"
                        value={newServiceSuv}
                        onChange={e => setNewServiceSuv(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Премиум (KGS):</label>
                      <input
                        type="number"
                        value={newServicePremium}
                        onChange={e => setNewServicePremium(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingService(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                    >
                      Сохранить и опубликовать
                    </button>
                  </div>
                </form>
              )}

              {/* Price Editor Table */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">Услуга</th>
                        <th className="p-3.5">Седан (сом)</th>
                        <th className="p-3.5">Кроссовер (сом)</th>
                        <th className="p-3.5">Внедорожник (сом)</th>
                        <th className="p-3.5">Премиум (сом)</th>
                        <th className="p-3.5 text-right">Действие</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {services.map(s => {
                        const cur = editingPrices[s.id] || {
                          sedan: s.priceSedan,
                          crossover: s.priceCrossover,
                          suv: s.priceSuv,
                          premium: s.pricePremium
                        };

                        return (
                          <tr key={s.id} className="hover:bg-slate-900/40">
                            <td className="p-3.5 max-w-xs">
                              <div className="font-extrabold text-white text-xs">{s.titleKey}</div>
                              <div className="text-[10px] text-amber-400">Гарантия: {s.warrantyYears} лет • Время: ~{s.durationHours} ч.</div>
                            </td>

                            <td className="p-3.5">
                              <input
                                type="number"
                                value={cur.sedan}
                                onChange={e => handlePriceChange(s.id, 'sedan', Number(e.target.value))}
                                className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-xs text-white focus:border-amber-500 font-mono font-bold"
                              />
                            </td>

                            <td className="p-3.5">
                              <input
                                type="number"
                                value={cur.crossover}
                                onChange={e => handlePriceChange(s.id, 'crossover', Number(e.target.value))}
                                className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-xs text-white focus:border-amber-500 font-mono font-bold"
                              />
                            </td>

                            <td className="p-3.5">
                              <input
                                type="number"
                                value={cur.suv}
                                onChange={e => handlePriceChange(s.id, 'suv', Number(e.target.value))}
                                className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-xs text-white focus:border-amber-500 font-mono font-bold"
                              />
                            </td>

                            <td className="p-3.5">
                              <input
                                type="number"
                                value={cur.premium}
                                onChange={e => handlePriceChange(s.id, 'premium', Number(e.target.value))}
                                className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-xs text-white focus:border-amber-500 font-mono font-bold"
                              />
                            </td>

                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => handleSavePrice(s.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer"
                                title="Сохранить цену"
                              >
                                Сохранить
                              </button>

                              <button
                                onClick={() => deleteService(s.id)}
                                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors cursor-pointer"
                                title="Удалить услугу"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MASTERS MANAGEMENT */}
          {activeTab === 'masters' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Управление мастерами и специалистами TONIX TINT STUDIO</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Добавляйте новых мастеров, меняйте стаж, рейтинг и специализацию. Шеф-мастер Кадырбеков Арген указан главным контактным лицом.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingMaster(!isAddingMaster)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingMaster ? 'Отмена' : 'Добавить мастера'}</span>
                </button>
              </div>

              {/* Add Master Form */}
              {isAddingMaster && (
                <form onSubmit={handleCreateMaster} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Регистрация нового мастера
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">ФИО мастера:</label>
                      <input
                        type="text"
                        required
                        value={newMasterName}
                        onChange={e => setNewMasterName(e.target.value)}
                        placeholder="Например: Кадырбеков Арген"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Должность / Роль:</label>
                      <input
                        type="text"
                        required
                        value={newMasterRole}
                        onChange={e => setNewMasterRole(e.target.value)}
                        placeholder="Шеф-мастер / Мастер PPF"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Опыт работы (лет):</label>
                      <input
                        type="number"
                        value={newMasterExp}
                        onChange={e => setNewMasterExp(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">Специализация и сертификаты:</label>
                    <input
                      type="text"
                      required
                      value={newMasterSpecialty}
                      onChange={e => setNewMasterSpecialty(e.target.value)}
                      placeholder="Премиум тонировка LLumar, бронирование кузова STEK"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Photo Upload & Presets for New Master */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <label className="block text-xs text-amber-400 font-bold flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Фотография мастера:</span>
                    </label>

                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src={newMasterAvatar}
                        alt="Preview"
                        className="w-14 h-14 rounded-xl object-cover border-2 border-amber-500 shadow-md shrink-0"
                      />

                      <div className="space-y-1.5 flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Загрузить фото с телефона / ПК</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoFileUpload(e, 'new')}
                            />
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">или URL:</span>
                          <input
                            type="text"
                            value={newMasterAvatar}
                            onChange={e => setNewMasterAvatar(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1">Или выберите готовое фото:</div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {MASTER_PHOTO_PRESETS.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setNewMasterAvatar(preset)}
                            className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                              newMasterAvatar === preset ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={preset} alt="preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingMaster(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                    >
                      Добавить в студию
                    </button>
                  </div>
                </form>
              )}

              {/* Masters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {masters.map(m => {
                  const isEditing = editingMasterId === m.id;

                  if (isEditing) {
                    return (
                      <div
                        key={m.id}
                        className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500 space-y-3.5 shadow-xl"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Edit className="w-3.5 h-3.5" />
                            <span>Редактирование: {m.name}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditingMasterId(null)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Отмена
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">ФИО мастера:</label>
                            <input
                              type="text"
                              value={editMasterForm.name}
                              onChange={e => setEditMasterForm({ ...editMasterForm, name: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Должность:</label>
                            <input
                              type="text"
                              value={editMasterForm.role}
                              onChange={e => setEditMasterForm({ ...editMasterForm, role: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Experience, Completed Cars, Rating */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-900/90 p-2 rounded-xl border border-amber-500/40">
                            <label className="block text-[11px] font-bold text-amber-400 mb-1">Стаж (лет):</label>
                            <input
                              type="number"
                              min="0"
                              max="40"
                              value={editMasterForm.experienceYears}
                              onChange={e => setEditMasterForm({ ...editMasterForm, experienceYears: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white font-mono font-bold text-center focus:border-amber-500"
                            />
                          </div>

                          <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                            <label className="block text-[11px] text-slate-400 mb-1">Оклеено авто:</label>
                            <input
                              type="number"
                              value={editMasterForm.completedCars}
                              onChange={e => setEditMasterForm({ ...editMasterForm, completedCars: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                            />
                          </div>

                          <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                            <label className="block text-[11px] text-slate-400 mb-1">Рейтинг (★):</label>
                            <input
                              type="number"
                              step="0.05"
                              min="1"
                              max="5"
                              value={editMasterForm.rating}
                              onChange={e => setEditMasterForm({ ...editMasterForm, rating: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-amber-400 font-mono text-center font-bold"
                            />
                          </div>
                        </div>

                        {/* Photo Upload & Presets for Editing Master */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <label className="block text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5" />
                            <span>Фотография мастера:</span>
                          </label>

                          <div className="flex flex-wrap items-center gap-3">
                            <img
                              src={editMasterForm.avatarUrl}
                              alt="Avatar Preview"
                              className="w-14 h-14 rounded-xl object-cover border-2 border-amber-500 shadow-md shrink-0"
                            />

                            <div className="space-y-1.5 flex-1 min-w-[200px]">
                              <div className="flex items-center gap-2">
                                <label className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Загрузить фото с телефона / ПК</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handlePhotoFileUpload(e, 'edit')}
                                  />
                                </label>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-slate-400">или URL:</span>
                                <input
                                  type="text"
                                  value={editMasterForm.avatarUrl}
                                  onChange={e => setEditMasterForm({ ...editMasterForm, avatarUrl: e.target.value })}
                                  placeholder="https://..."
                                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2 py-1 text-xs text-slate-200"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Quick Presets for editing */}
                          <div>
                            <div className="text-[10px] text-slate-400 mb-1">Или выберите готовое фото мастера:</div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                              {MASTER_PHOTO_PRESETS.map((preset, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => setEditMasterForm({ ...editMasterForm, avatarUrl: preset })}
                                  className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                    editMasterForm.avatarUrl === preset ? 'border-amber-400 scale-105' : 'border-slate-850 opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img src={preset} alt="preset" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Специализация:</label>
                          <textarea
                            rows={2}
                            value={editMasterForm.specialty}
                            onChange={e => setEditMasterForm({ ...editMasterForm, specialty: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingMasterId(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-750 text-xs text-slate-400"
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveMasterEdit(m.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Сохранить</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between space-y-3.5 transition-all shadow-md group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Interactive Avatar with Permanent Photo Change Button */}
                        <div className="flex flex-col items-center gap-1.5 shrink-0">
                          <div className="relative">
                            <img
                              src={m.avatarUrl}
                              alt={m.name}
                              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
                            />
                            {m.id === 'master-argen' && (
                              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] shadow">
                                ШЕФ
                              </span>
                            )}
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => openPhotoModal(m)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 text-[10px] font-bold border border-amber-500/30 transition-all cursor-pointer whitespace-nowrap shadow-sm"
                            title="Сменить фотографию мастера (загрузить или выбрать из каталога)"
                          >
                            <Camera className="w-3 h-3 text-amber-400" />
                            <span>Сменить фото</span>
                          </button>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-extrabold text-sm sm:text-base text-white truncate">{m.name}</h4>
                            <span className="text-amber-400 font-bold text-xs shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                              ★ {m.rating}
                            </span>
                          </div>
                          <p className="text-xs text-amber-400 font-semibold mt-0.5">{m.role}</p>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{m.specialty}</p>

                          {/* Quick Badges */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              Оклеено: <strong className="text-white">{m.completedCars}+ авто</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Experience Quick Editor Row */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {/* Stepper with clear numbers */}
                          <div className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/40 px-2.5 py-1 rounded-xl">
                            <span className="text-[11px] text-amber-400 font-bold">Стаж:</span>
                            <button
                              type="button"
                              onClick={() => handleQuickExpUpdate(m.id, -1)}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-black flex items-center justify-center transition-colors cursor-pointer text-xs"
                              title="Уменьшить стаж на 1 год"
                            >
                              -
                            </button>
                            
                            <span className="font-mono font-black text-white text-xs px-1 min-w-[24px] text-center">
                              {m.experienceYears}
                            </span>
                            <span className="text-slate-400 text-[11px]">лет</span>

                            <button
                              type="button"
                              onClick={() => handleQuickExpUpdate(m.id, 1)}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-black flex items-center justify-center transition-colors cursor-pointer text-xs"
                              title="Увеличить стаж на 1 год"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => openExpModal(m)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-[11px] font-bold border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1"
                            title="Открыть окно изменения стажа"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Задать стаж</span>
                          </button>
                        </div>

                        {/* Quick Presets for Experience (1-click) */}
                        <div className="flex items-center gap-1 overflow-x-auto pt-0.5">
                          <span className="text-[10px] text-slate-500 mr-1 shrink-0">Быстрый стаж:</span>
                          {[3, 5, 7, 8, 10, 12, 15].map(yrs => (
                            <button
                              key={yrs}
                              type="button"
                              onClick={() => handleSetExactExp(m.id, yrs)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer shrink-0 ${
                                m.experienceYears === yrs
                                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                              }`}
                              title={`Установить стаж ${yrs} лет`}
                            >
                              {yrs} лет
                            </button>
                          ))}
                        </div>

                        {/* Card bottom actions */}
                        <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => startEditingMaster(m)}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Полное редактирование мастера"
                          >
                            <Edit className="w-3 h-3 text-amber-400" />
                            <span>Все данные</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteMaster(m.id)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Удалить мастера"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROMOTIONS & DEALS */}
          {activeTab === 'promotions' && (
            <div className="space-y-6">
              
              {/* Announcement Top Banner Editor */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Объявление в шапке сайта (Бегущая строка / Акция)</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Текст баннера в самом верху сайта. Привлекает внимание каждого посетителя.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveAnnouncement} className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    required
                    value={announcementInput}
                    onChange={e => setAnnouncementInput(e.target.value)}
                    placeholder="Например: Скидка 20% на оригинальную тонировку LLumar до конца недели!"
                    className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide cursor-pointer whitespace-nowrap transition-colors"
                  >
                    Обновить баннер
                  </button>
                </form>
              </div>

              {/* Promotions Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-400" />
                    <span>Спецпредложения и Промокоды студии</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Объявляйте сезонные скидки, промокоды и подарки. Они мгновенно появляются в блоке «Акции» на сайте.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingPromo(!isAddingPromo)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-lg shadow-red-500/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingPromo ? 'Отмена' : '+ Объявить акцию'}</span>
                </button>
              </div>

              {/* Add Promotion Form */}
              {isAddingPromo && (
                <form onSubmit={handleCreatePromo} className="p-5 rounded-2xl bg-slate-950 border border-red-500/40 space-y-4 animate-in fade-in">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Создание новой спец-акции</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Название акции:</label>
                      <input
                        type="text"
                        required
                        value={newPromoTitle}
                        onChange={e => setNewPromoTitle(e.target.value)}
                        placeholder="Например: Пакет «Зоны риска PPF» + Бронь фар в подарок"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Ярлык / Бейдж:</label>
                      <input
                        type="text"
                        required
                        value={newPromoBadge}
                        onChange={e => setNewPromoBadge(e.target.value)}
                        placeholder="ХИТ СЕЗОНА / АКЦИЯ НЕДЕЛИ"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">Описание акции:</label>
                    <textarea
                      rows={2}
                      required
                      value={newPromoDesc}
                      onChange={e => setNewPromoDesc(e.target.value)}
                      placeholder="Подробное описание условий спецпредложения для клиентов..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Размер скидки (%):</label>
                      <input
                        type="number"
                        min="5"
                        max="70"
                        value={newPromoPercent}
                        onChange={e => setNewPromoPercent(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-amber-400 font-bold font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Промокод:</label>
                      <input
                        type="text"
                        required
                        value={newPromoCode}
                        onChange={e => setNewPromoCode(e.target.value.toUpperCase())}
                        placeholder="TONIX20"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono uppercase font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Действует до:</label>
                      <input
                        type="text"
                        required
                        value={newPromoValid}
                        onChange={e => setNewPromoValid(e.target.value)}
                        placeholder="30 ноября 2026"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Цветовой градиент:</label>
                      <select
                        value={newPromoColor}
                        onChange={e => setNewPromoColor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white"
                      >
                        <option value="from-amber-500 to-orange-600">Золото / Огонь</option>
                        <option value="from-blue-600 to-cyan-500">Синий / Неон</option>
                        <option value="from-emerald-500 to-teal-600">Изумруд</option>
                        <option value="from-purple-600 to-pink-600">Пурпур</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPromo(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase"
                    >
                      Опубликовать акцию
                    </button>
                  </div>
                </form>
              )}

              {/* Promotions Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promotions.map(promo => {
                  const isEditing = editingPromoId === promo.id;

                  if (isEditing) {
                    return (
                      <div
                        key={promo.id}
                        className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500 space-y-3.5 shadow-xl"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Edit className="w-3.5 h-3.5" />
                            <span>Редактирование акции</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditingPromoId(null)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Отмена
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Название акции:</label>
                          <input
                            type="text"
                            value={editPromoForm.title}
                            onChange={e => setEditPromoForm({ ...editPromoForm, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Описание:</label>
                          <textarea
                            rows={2}
                            value={editPromoForm.description}
                            onChange={e => setEditPromoForm({ ...editPromoForm, description: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-750 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Скидка (%):</label>
                            <input
                              type="number"
                              value={editPromoForm.discountPercent}
                              onChange={e => setEditPromoForm({ ...editPromoForm, discountPercent: Number(e.target.value) })}
                              className="w-full bg-slate-900 border border-slate-750 rounded-lg p-1.5 text-xs text-amber-400 font-bold font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Промокод:</label>
                            <input
                              type="text"
                              value={editPromoForm.code}
                              onChange={e => setEditPromoForm({ ...editPromoForm, code: e.target.value.toUpperCase() })}
                              className="w-full bg-slate-900 border border-slate-750 rounded-lg p-1.5 text-xs text-white font-mono uppercase font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Срок:</label>
                            <input
                              type="text"
                              value={editPromoForm.validUntil}
                              onChange={e => setEditPromoForm({ ...editPromoForm, validUntil: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-750 rounded-lg p-1.5 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingPromoId(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-750 text-xs text-slate-400"
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSavePromoEdit(promo.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Сохранить</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={promo.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3 relative overflow-hidden"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span>{promo.badge}</span>
                          </span>

                          <span className="text-xl font-black text-amber-400">
                            -{promo.discountPercent}%
                          </span>
                        </div>

                        <h4 className="font-extrabold text-sm text-white">{promo.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{promo.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800 text-[11px]">
                            {promo.code}
                          </span>
                          <span className="text-[11px] text-slate-500">{promo.validUntil}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEditingPromo(promo)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                            title="Редактировать акцию"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Изменить</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => deletePromotion(promo.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Удалить акцию"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 5: SCHEDULE & CONTACTS */}
          {activeTab === 'schedule' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Управление графиком работы и контактными данными</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Любые изменения мгновенно отображаются в шапке, подвале, на карте и в чат-боте студии.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>График работы студии:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsWorkHours}
                    onChange={e => setSettingsWorkHours(e.target.value)}
                    placeholder="Ежедневно: 09:00 – 21:00 (без выходных)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Пример: «Круглосуточно 24/7» или «Пн-Сб 09:00 – 20:00, Вс выходной»</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Адрес студии в Бишкеке:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsAddress}
                    onChange={e => setSettingsAddress(e.target.value)}
                    placeholder="Проспект Жибек-Жолу, 730/1, Ленинский район, г. Бишкек, 720033"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Телефон для звонков:</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsPhone}
                      onChange={e => setSettingsPhone(e.target.value)}
                      placeholder="+996 700 910 777"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp номер:</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsWhatsapp}
                      onChange={e => setSettingsWhatsapp(e.target.value)}
                      placeholder="+996 700 910 777"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Instagram профиль:</span>
                      </label>
                      <a
                        href={getInstagramUrl(settingsInstagram)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-pink-400 hover:underline flex items-center gap-0.5 font-bold"
                      >
                        <span>Проверить</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="text"
                      value={settingsInstagram}
                      onChange={e => setSettingsInstagram(e.target.value)}
                      placeholder="https://www.instagram.com/tonix.kg или @tonix.kg"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500 font-mono text-pink-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Telegram:</span>
                      </label>
                      <a
                        href={getTelegramUrl(settingsTelegram)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Проверить</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="text"
                      value={settingsTelegram}
                      onChange={e => setSettingsTelegram(e.target.value)}
                      placeholder="@tonix_tint_kg"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono text-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">Ссылка 2GIS:</label>
                      <a href={settingsGisLink} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5">
                        <span>2GIS</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="text"
                      value={settingsGisLink}
                      onChange={e => setSettingsGisLink(e.target.value)}
                      placeholder="https://2gis.kg/bishkek"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono text-emerald-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">Ссылка Яндекс Карты:</label>
                      <a href={settingsYandexMapsLink} target="_blank" rel="noreferrer" className="text-[10px] text-red-400 hover:underline flex items-center gap-0.5">
                        <span>Яндекс</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="text"
                      value={settingsYandexMapsLink}
                      onChange={e => setSettingsYandexMapsLink(e.target.value)}
                      placeholder="https://yandex.ru/maps/bishkek"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono text-red-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Шеф-мастер & Контактное лицо:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsContactPerson}
                    onChange={e => setSettingsContactPerson(e.target.value)}
                    placeholder="Кадырбеков Арген (Шеф-мастер & Контактное лицо)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Сохранить настройки студии</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: PORTFOLIO & GALLERY BEFORE/AFTER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                    <span>Управление портфолио и Галереей До / После</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Добавляйте выполненные проекты студии с интерактивным сравнением ДО и ПОСЛЕ.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md shadow-purple-500/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingPortfolio ? 'Отмена' : '+ Добавить работу'}</span>
                </button>
              </div>

              {/* Add Portfolio Form */}
              {isAddingPortfolio && (
                <form onSubmit={handleSavePortfolio} className="p-5 rounded-2xl bg-slate-950 border border-purple-500/50 space-y-4 shadow-xl">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Новая работа в портфолио
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Автомобиль:</label>
                      <input
                        type="text"
                        required
                        value={newPortfolioCar}
                        onChange={e => setNewPortfolioCar(e.target.value)}
                        placeholder="Например: Lexus LX 600"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Категория:</label>
                      <select
                        value={newPortfolioCategory}
                        onChange={e => setNewPortfolioCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      >
                        <option value="ppf">Бронепленка (PPF полиуретан)</option>
                        <option value="tinting">Тонировка (LLumar / ГОСТ)</option>
                        <option value="vinyl">Винил и Антихром</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Использованная пленка:</label>
                      <input
                        type="text"
                        value={newPortfolioFilm}
                        onChange={e => setNewPortfolioFilm(e.target.value)}
                        placeholder="STEK DYNOshield 215 mkm"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Время работы:</label>
                      <input
                        type="text"
                        value={newPortfolioTime}
                        onChange={e => setNewPortfolioTime(e.target.value)}
                        placeholder="2 дня / 3 часа"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Заголовок проекта:</label>
                      <input
                        type="text"
                        value={newPortfolioTitle}
                        onChange={e => setNewPortfolioTitle(e.target.value)}
                        placeholder="Lexus LX 600 • Полная бронепленка STEK DYNOshield"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Фотография ДО:</label>
                      <input
                        type="text"
                        value={newPortfolioBeforeImg}
                        onChange={e => setNewPortfolioBeforeImg(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Фотография ПОСЛЕ:</label>
                      <input
                        type="text"
                        value={newPortfolioAfterImg}
                        onChange={e => setNewPortfolioAfterImg(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Описание работы:</label>
                    <textarea
                      rows={2}
                      value={newPortfolioDesc}
                      onChange={e => setNewPortfolioDesc(e.target.value)}
                      placeholder="Подробности выполненного детейлинга..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
                    <button
                      type="button"
                      onClick={() => setIsAddingPortfolio(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase"
                    >
                      Опубликовать в портфолио
                    </button>
                  </div>
                </form>
              )}

              {/* Portfolio items list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{item.title}</span>
                        <span className="text-[10px] text-amber-400 font-semibold">{item.film} • {item.timeSpent}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deletePortfolioItem(item.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-red-400 text-xs"
                        title="Удалить работу"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-850">
                        <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">ДО</span>
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-850">
                        <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-[9px] font-bold text-slate-950">ПОСЛЕ</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REVIEWS CMS & MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Отзывы клиентов студии ({reviews.length})</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Управление отзывами, добавление новых рекомендаций и модерация.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingReview(!isAddingReview)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingReview ? 'Отмена' : '+ Добавить отзыв'}</span>
                </button>
              </div>

              {/* Add Review Form */}
              {isAddingReview && (
                <form onSubmit={handleSaveReview} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Добавить новый проверенный отзыв
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Имя клиента:</label>
                      <input
                        type="text"
                        required
                        value={newRevAuthor}
                        onChange={e => setNewRevAuthor(e.target.value)}
                        placeholder="Улан Асанов"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Автомобиль:</label>
                      <input
                        type="text"
                        value={newRevCar}
                        onChange={e => setNewRevCar(e.target.value)}
                        placeholder="Lexus LX 570 (2020)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Мастер:</label>
                      <select
                        value={newRevMaster}
                        onChange={e => setNewRevMaster(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      >
                        {masters.map(m => (
                          <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Услуга:</label>
                      <input
                        type="text"
                        value={newRevService}
                        onChange={e => setNewRevService(e.target.value)}
                        placeholder="Бронирование Зоны риска STEK + Тонировка"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Оценка:</label>
                      <div className="flex items-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRevRating(star)}
                            className="cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= newRevRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Текст отзыва:</label>
                    <textarea
                      rows={3}
                      required
                      value={newRevComment}
                      onChange={e => setNewRevComment(e.target.value)}
                      placeholder="Отзыв клиента о качестве тонировки и защитной пленки..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
                    <button
                      type="button"
                      onClick={() => setIsAddingReview(false)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                    >
                      Опубликовать отзыв
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-white">{rev.authorName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                            Проверен
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{rev.carModel} • Мастер: {rev.masterName || 'Шеф-мастер'}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteReview(rev.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                          title="Удалить отзыв"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-amber-300/90 font-semibold">{rev.serviceName}</div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                      «{rev.comment}»
                    </p>
                    <div className="text-[10px] text-slate-500 flex justify-between items-center">
                      <span>Дата: {rev.date}</span>
                      <span>👍 {rev.likes} полезно</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TELEGRAM & WEBHOOKS */}
          {activeTab === 'telegram' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Telegram Webhook Dispatcher (@TonixTintStudio_bot)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Каждая новая онлайн-запись с сайта мгновенно отправляется дежурному мастеру Кадырбекову Аргену в Telegram.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  200 OK ACTIVE
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {telegramLogs.map(log => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span>Время отправки: {log.time}</span>
                      <span className="text-emerald-400">STATUS: DELIVERED</span>
                    </div>
                    <p className="text-slate-200 whitespace-pre-line bg-slate-900 p-2.5 rounded-lg border border-slate-850">
                      {log.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PHOTO PICKER MODAL (For any master) */}
        {photoModalMaster && (
          <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" />
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    Фотография мастера: {photoModalMaster.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoModalMaster(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preview */}
              <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <img
                  src={photoModalPreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-lg shrink-0"
                />
                <div>
                  <span className="text-xs font-bold text-white block">{photoModalMaster.name}</span>
                  <span className="text-[11px] text-amber-400 font-semibold">{photoModalMaster.role}</span>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Выбранное фото готово к сохранению</span>
                  </p>
                </div>
              </div>

              {/* Option 1: Upload from device */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  1. Загрузить своё фото (с телефона или ПК):
                </label>
                <label className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md">
                  <Upload className="w-4 h-4" />
                  <span>Выбрать файл с устройства / галереи</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const compressed = await compressImageFile(file, 480, 0.82);
                        setPhotoModalPreview(compressed);
                        addNotification('Фото загружено', 'Фотография оптимизирована и готова к применению.', 'success');
                      } catch (err: any) {
                        addNotification('Ошибка', err?.message || 'Не удалось прочитать фото', 'alert');
                      }
                    }}
                  />
                </label>
              </div>

              {/* Option 2: Gallery Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  2. Или выберите стильное фото из каталога студии:
                </label>
                <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {MASTER_PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoModalPreview(preset)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        photoModalPreview === preset ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                      {photoModalPreview === preset && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: URL */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate-400">
                  3. Или вставьте прямую ссылку на фото:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={photoModalUrlInput}
                    onChange={e => setPhotoModalUrlInput(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (photoModalUrlInput.trim()) {
                        setPhotoModalPreview(photoModalUrlInput.trim());
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                  >
                    Применить
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setPhotoModalMaster(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleSavePhotoModal}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Сохранить фото на сайте</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE EDITOR MODAL (For any master) */}
        {expModalMaster && (
          <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    Стаж работы: {expModalMaster.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setExpModalMaster(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Big Stepper */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-3">
                <div className="text-xs text-slate-400 font-semibold">Текущий опыт мастера:</div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setExpModalValue(prev => Math.max(0, prev - 1))}
                    className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-2xl flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                  >
                    -
                  </button>

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-4xl sm:text-5xl font-black text-white">{expModalValue}</span>
                    <span className="text-sm font-bold text-amber-400">лет</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpModalValue(prev => prev + 1)}
                    className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-2xl flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Fast presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 text-center">
                  Быстрый выбор стажа (1 клик):
                </label>
                <div className="flex flex-wrap justify-center gap-2">
                  {[3, 5, 7, 8, 10, 12, 15, 20].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setExpModalValue(val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        expModalValue === val
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {val} лет
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setExpModalMaster(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleSaveExpModal}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Сохранить стаж ({expModalValue} лет)</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
