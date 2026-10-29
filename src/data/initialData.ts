import { ServiceItem, Master, Review, Promotion, FaqItem, Booking, HeroSlide, GalleryItem, InstagramPost } from '../types';
// Services, promotions and FAQ live in catalog.json so the server (WhatsApp bot) reads the same data.
import catalog from './catalog.json';

export const INITIAL_SERVICES = catalog.services as ServiceItem[];

export const INITIAL_MASTERS: Master[] = [
  {
    id: 'master-argen',
    name: 'Кадырбеков Арген',
    role: 'Шеф-мастер & Контактное лицо',
    experienceYears: 10,
    rating: 5.0,
    completedCars: 2450,
    specialty: 'Руководитель TONIX TINT, премиум тонировка LLumar ATR/CTX, бронепленка STEK DYNOshield, приемка авто и гарантии',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    availableDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  },
  {
    id: 'master-azamat',
    name: 'Азамат Ибраимов',
    role: 'Мастер бронирования PPF',
    experienceYears: 9,
    rating: 4.98,
    completedCars: 1420,
    specialty: 'Антигравийный полиуретан STEK/LLumar, сложные изгибы кузова, Zeekr/Lexus',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    availableDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  },
  {
    id: 'master-erkin',
    name: 'Эркин Бакиров',
    role: 'Специалист по цветному винилу и антихрому',
    experienceYears: 7,
    rating: 4.95,
    completedCars: 890,
    specialty: 'Полная перетяжка в Satin/Gloss Avery, матовые эффекты, разборка/сборка',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    availableDays: ['Пн', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  },
  {
    id: 'master-ruslan',
    name: 'Руслан Мусаев',
    role: 'Мастер детейлинга и нанокерамики',
    experienceYears: 8,
    rating: 4.97,
    completedCars: 1120,
    specialty: 'Мягкая полировка Rupes, керамические покрытия 9H, реставрация фар',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    availableDays: ['Пн', 'Вт', 'Чт', 'Пт', 'Сб', 'Вс']
  }
];

export const INITIAL_PROMOTIONS = catalog.promotions as Promotion[];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Улан Асанов',
    carModel: 'Lexus LX 570 (2020)',
    rating: 5,
    date: '02 октября 2026',
    serviceName: 'Бронирование «Зоны риска» STEK + Тонировка задней полусферы',
    comment: 'Делал бронирование переда и тонировку на свой LX570. Мастер Азамат сделал всё ювелирно — ни одной пылинки под пленкой! Прокатился на Иссык-Куль по трассе, от гравия ни следа, пленка держит супер. Однозначно лучший детейлинг в Бишкеке.',
    verified: true,
    likes: 42,
    masterName: 'Азамат Ибраимов'
  },
  {
    id: 'rev-2',
    authorName: 'Александр Ким',
    carModel: 'BMW X5 G05 (2023)',
    rating: 5,
    date: '28 сентября 2026',
    serviceName: 'Тонировка вкруг Llumar + Комплекс Антихром',
    comment: 'Затонировал по кругу: сзади 5%, спереди 15% с официальным разрешением через Түндүк, помогли с оформлением за 15 минут. Шеф-мастер Арген Кадырбеков лично курировал работу, антихром вокруг окон лег ровно, машина стала выглядеть строго и злобно. Чай, кофе в зоне ожидания — класс!',
    verified: true,
    likes: 31,
    masterName: 'Кадырбеков Арген'
  },
  {
    id: 'rev-3',
    authorName: 'Бакытбек Токтогулов',
    carModel: 'Zeekr 001 (2024)',
    rating: 5,
    date: '20 сентября 2026',
    serviceName: 'Полное бронирование кузова STEK DYNOshield',
    comment: 'Новый Зикр сразу из салона пригнал в TONIX TINT STUDIO. Оклеили полностью в полиуретан, включая панорамную крышу и мониторы в салоне. Через неделю приехал на контрольный осмотр — всё идеально. Рекомендую всем владельцам электрокаров.',
    verified: true,
    likes: 56,
    masterName: 'Азамат Ибраимов'
  },
  {
    id: 'rev-4',
    authorName: 'Камилла Мамытова',
    carModel: 'Toyota Camry 75 (2022)',
    rating: 5,
    date: '14 сентября 2026',
    serviceName: 'Атермальная пленка LLumar AIR 80 на лобовое стекло',
    comment: 'Летом в Бишкеке в пробках на Ахунбаева панель просто раскалялась. Поставила атермалку LLumar Air 80 — это просто спасение! Глаза не устают от яркого солнца, кондиционер охлаждает за минуту, обзор ночью чистый.',
    verified: true,
    likes: 27,
    masterName: 'Дмитрий Кузнецов'
  },
  {
    id: 'rev-5',
    authorName: 'Тимур Джумабаев',
    carModel: 'Mercedes-Benz G63 AMG',
    rating: 5,
    date: '05 сентября 2026',
    serviceName: 'Полная оклейка в матовый сатин Satin Black Avery Dennison',
    comment: 'Гелик преобразился до неузнаваемости. Работа с гранями на этой машине адская, но Эркин справился на 10 из 10. Никаких натяжек или белых стыков. Оплатил через MBank QR, выдали гарантийный сертификат.',
    verified: true,
    likes: 64,
    masterName: 'Эркин Бакиров'
  }
];

export const INITIAL_FAQS = catalog.faqs as FaqItem[];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-78901',
    createdAt: '2026-10-07T14:30:00Z',
    clientName: 'Бексултан Маратов',
    clientPhone: '+996 550 443 322',
    carBrand: 'Lexus',
    carModel: 'LX 600',
    carYear: 2024,
    carCategory: 'suv',
    serviceId: 'ppf-risk-zones',
    serviceTitle: 'Бронирование «Зоны риска» (PPF полиуретан)',
    masterId: 'master-azamat',
    masterName: 'Азамат Ибраимов',
    bookingDate: '2026-10-09',
    bookingTime: '10:00',
    filmBrand: 'STEK DYNOshield (USA)',
    priceKgs: 60000,
    paymentMethod: 'mbank',
    paymentStatus: 'paid',
    status: 'in_progress',
    telegramSent: true,
    notes: 'Помыть перед оклейкой, дополнительно забронировать экран мультимедиа.',
    tintPermitAssistance: false
  },
  {
    id: 'BK-78902',
    createdAt: '2026-10-08T08:15:00Z',
    clientName: 'Нурлан Жапаров',
    clientPhone: '+996 702 119 988',
    carBrand: 'Toyota',
    carModel: 'Camry 70',
    carYear: 2021,
    carCategory: 'sedan',
    serviceId: 'tint-front',
    serviceTitle: 'Тонировка передних боковых стекол',
    masterId: 'master-argen',
    masterName: 'Кадырбеков Арген',
    bookingDate: '2026-10-09',
    bookingTime: '14:00',
    filmBrand: 'LLumar ATR (USA)',
    priceKgs: 3500,
    paymentMethod: 'cash',
    paymentStatus: 'pay_on_site',
    status: 'pending',
    telegramSent: true,
    notes: 'Нужна помощь в Түндүк с оплатой пошлины ГУ Унаа.',
    tintPermitAssistance: true
  },
  {
    id: 'BK-78895',
    createdAt: '2026-10-06T11:00:00Z',
    clientName: 'Эльдар Садыков',
    clientPhone: '+996 777 554 433',
    carBrand: 'BMW',
    carModel: 'X5 G05',
    carYear: 2023,
    carCategory: 'crossover',
    serviceId: 'dechrome-shadow',
    serviceTitle: 'Комплекс «Антихром» (Shadow Line)',
    masterId: 'master-erkin',
    masterName: 'Эркин Бакиров',
    bookingDate: '2026-10-08',
    bookingTime: '16:00',
    filmBrand: 'Avery Dennison Gloss Black',
    priceKgs: 15000,
    paymentMethod: 'optima',
    paymentStatus: 'paid',
    status: 'ready',
    telegramSent: true,
    notes: 'Затемнение шильдиков и решетки радиатора.'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Lexus LX 600 • Полная бронепленка STEK DYNOshield',
    category: 'ppf',
    film: 'STEK DYNOshield Gloss 215 mkm',
    timeSpent: '2 дня',
    car: 'Lexus LX 600',
    beforeImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    description: 'Полная консервация ЛКП в премиальный американский полиуретан. Идеальный гидрофобный эффект и самозатягивание микроцарапин.'
  },
  {
    id: 'gal-2',
    title: 'BMW M5 F90 • Тонировка Llumar ATR + Атермалка AIR80',
    category: 'tinting',
    film: 'LLumar ATR 5% + AIR 80 Chameleon',
    timeSpent: '3 часа',
    car: 'BMW M5',
    beforeImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    description: 'Затемнение задней полусферы в 5% и атермальная защита лобового стекла. Идеальный обзор изнутри при 100% приватности снаружи.'
  },
  {
    id: 'gal-3',
    title: 'Porsche Taycan 4S • Виниловый стайлинг Nardo Grey',
    category: 'vinyl',
    film: 'Avery Dennison SW900 Nardo Grey',
    timeSpent: '24 часа',
    car: 'Porsche Taycan',
    beforeImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    description: 'Полная смена заводского белого цвета в культовый серый глянец Nardo Grey с аккуратной подгонкой всех стыков.'
  },
  {
    id: 'gal-4',
    title: 'Mercedes-Benz G63 AMG • Черный матовый сатин',
    category: 'vinyl',
    film: '3M 2080 Satin Deep Black + De-chrome',
    timeSpent: '2.5 дня',
    car: 'Mercedes G63 AMG',
    beforeImage: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    description: 'Устранение всего заводского хрома (Shadow Line) и обтяжка кузова в шелковистый сатиновый винил.'
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
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

export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1080&q=85',
    caption: 'Новый BMW M5 Competition в работе! 🔥 Полная атермальная защита LLumar AIR 80 на лобовое стекло и передние двери. В салоне прохладно даже при +38°C на солнце Бишкека! Запись в боксы через директ или WhatsApp в шапке профиля.',
    likes: 1240,
    commentsCount: 48,
    timestamp: '2 часа назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'tinting',
    tags: ['#tonixkg', '#тонировкабишкек', '#bmwm5', '#llumar', '#bishkekcars', '#автобишкек']
  },
  {
    id: 'post-2',
    type: 'carousel',
    mediaUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1080&q=85',
    caption: 'Mercedes-Benz G63 AMG — комплекс «Максимальная броня» 🛡️ Оклейка полиуретановой антигравийной пленкой STEK DYNOshield (толщина 215 мкм с функцией самозатягивания царапин) + глухое затемнение задней полусферы LLumar ATR 5%. 5 лет гарантии.',
    likes: 1890,
    commentsCount: 72,
    timestamp: '1 день назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'ppf',
    tags: ['#tonixkg', '#g63amg', '#бронепленкабишкек', '#ppfbishkek', '#stek', '#гелендваген']
  },
  {
    id: 'post-3',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1080&q=85',
    caption: 'Porsche 911 GT3 RS — безупречная оклейка передней части и зеркал антигравийной броней SunTek Ultra. Лакокрасочное покрытие в безопасности от сколов и гравия по трассе на Иссык-Куль! 🏔️✨',
    likes: 2150,
    commentsCount: 94,
    timestamp: '2 дня назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'ppf',
    tags: ['#tonixkg', '#porschebishkek', '#антигравийнаяпленка', '#детейлингбишкек', '#supercarskg']
  },
  {
    id: 'post-4',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1080&q=85',
    caption: 'Reels: До и После тонировки Toyota Land Cruiser 300! 🎥 Установили американскую пленку SunTek Carbon 15% на задние стекла и помогли клиенту с официальным разрешением на передние стекла через систему Түндүк МВД КР. Оцените результат в комментариях!',
    likes: 1670,
    commentsCount: 83,
    timestamp: '3 дня назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'before_after',
    tags: ['#tonixkg', '#landcruiser300', '#доипосле', '#тонировкакр', '#гуобадд', '#унаа']
  },
  {
    id: 'post-5',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1080&q=85',
    caption: 'Audi RS6 Avant в черном глянцевом стиле Shadow Line. Полный антихром решетки радиатора, молдингов вокруг окон и шильдиков. Тонировка задней полусферы LLumar ATR 5% — строгий, хищный вид! 🖤',
    likes: 1420,
    commentsCount: 51,
    timestamp: '4 дня назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'tinting',
    tags: ['#tonixkg', '#audirs6', '#антихромбишкек', '#shadowline', '#тонировкаавто']
  },
  {
    id: 'post-6',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1080&q=85',
    caption: 'Zeekr 001 — оклейка крыши в черный глянец и бронирование сенсорных экранов и консолей внутри салона. Высокоточный плоттерный раскрой по лекалам без опасности порезать обшивку ножом. Работаем ежедневно с 09:00 до 21:00.',
    likes: 995,
    commentsCount: 38,
    timestamp: '5 дней назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'reels',
    tags: ['#tonixkg', '#zeekr001', '#бронированиесалона', '#электромобилибишкек', '#tonix']
  },
  {
    id: 'post-7',
    type: 'carousel',
    mediaUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1080&q=85',
    caption: 'Lexus RX 350 — комплексная шумоизоляция дверей и атермальное тонирование лобового стекла пленкой UltraVision Chameleon. Красивый перелив оттенков и защита от перегрева торпедо.',
    likes: 870,
    commentsCount: 29,
    timestamp: '6 дней назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'tinting',
    tags: ['#tonixkg', '#lexusrx', '#хамелеонтонировка', '#бишкекавто', '#kyrgyzstan']
  },
  {
    id: 'post-8',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1080&q=85',
    caption: 'До и После: бронирование фар полиуретаном STEK DYNOcloud. Желтизна и микротрещины устранены легкой полировкой, после чего нанесена самозатягивающаяся пленка с защитой от помутнения на 7 лет! 💡',
    likes: 1130,
    commentsCount: 44,
    timestamp: '1 неделю назад',
    permalink: 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==',
    category: 'before_after',
    tags: ['#tonixkg', '#бронированиефар', '#доипосле', '#полировкабишкек', '#tonixkg']
  }
];

