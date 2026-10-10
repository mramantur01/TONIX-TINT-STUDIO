import { ServiceItem, Master, Review, Promotion, FaqItem, Booking, HeroSlide, GalleryItem, InstagramPost } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'tint-rear',
    category: 'tinting',
    titleKey: 'Тонировка задней полусферы',
    descriptionKey: 'Классическая тонировка задних боковых стекол и заднего стекла по ГОСТу КР (без необходимости разрешения). Защита от УФ и посторонних глаз.',
    priceSedan: 4500,
    priceCrossover: 5500,
    priceSuv: 6500,
    pricePremium: 8000,
    durationHours: 2,
    warrantyYears: 7,
    popular: true,
    features: [
      'Светопропускаемость: 5%, 15%, 20%, 35%',
      'Защита от ультрафиолета 99%',
      'Защита салона от нагрева и выгорания',
      'Безупречная подгонка без разбора обшивки'
    ],
    filmBrands: ['LLumar ATR (USA)', 'SunTek HP (USA)', 'UltraVision (USA)', 'Global (USA)'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'tint-front',
    category: 'tinting',
    titleKey: 'Тонировка передних боковых стекол',
    descriptionKey: 'Установка премиум-пленки на передние двери. Консультируем и помогаем оформить официальное разрешение ГУ «Унаа» МВД КР через Түндүк.',
    priceSedan: 3500,
    priceCrossover: 4000,
    priceSuv: 4500,
    pricePremium: 5500,
    durationHours: 1.5,
    warrantyYears: 7,
    popular: true,
    features: [
      'Сертифицированные пленки глубокого черного тона',
      'Одинаковый тон с заводской или задней тонировкой',
      'Помощь с получением квитанции и разрешения',
      'Не искажает обзорность в темное время суток'
    ],
    filmBrands: ['LLumar CTX Ceramic', 'STEK Action', 'SunTek Carbon'],
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'tint-atherm',
    category: 'tinting',
    titleKey: 'Атермальная тонировка (Лобовое + боковые)',
    descriptionKey: 'Прозрачная или с эффектом «Хамелеон» пленка, отражающая до 90% инфракрасного тепла. Салон остается прохладным даже в жару +40°C в Бишкеке.',
    priceSedan: 8000,
    priceCrossover: 9500,
    priceSuv: 11000,
    pricePremium: 14000,
    durationHours: 3,
    warrantyYears: 8,
    features: [
      'Проходит ГОСТ КР по светопропускаемости (>70%)',
      'Отражение инфракрасного тепла до 88%',
      'Снижение нагрузки на автокондиционер',
      'Антибликовый комфорт при встречных фарах'
    ],
    filmBrands: ['LLumar AIR 80', 'UltraVision Mystique Chameleon', 'SunTek CIR'],
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'ppf-risk-zones',
    category: 'ppf',
    titleKey: 'Бронирование «Зоны риска» (PPF полиуретан)',
    descriptionKey: 'Защита самых уязвимых деталей: передний бампер, капот целиком, передние крылья, фары, зеркала, зоны под ручками и кант дверей.',
    priceSedan: 45000,
    priceCrossover: 52000,
    priceSuv: 60000,
    pricePremium: 75000,
    durationHours: 8,
    warrantyYears: 10,
    popular: true,
    features: [
      'Толщина 200-215 микрон с функцией самозатягивания царапин (Self-healing)',
      'Гидрофобный лаковый слой Top-Coat',
      'Защита от гравия на трассах Бишкек-Ош и Бишкек-Чолпон-Ата',
      'Абсолютная невидимость на ЛКП'
    ],
    filmBrands: ['STEK DYNOshield (USA)', 'SunTek Ultra PPF', 'LLumar Platinum PPF', 'Hexis Bodyfence'],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'ppf-full-body',
    category: 'ppf',
    titleKey: 'Полное бронирование кузова (Full PPF)',
    descriptionKey: 'Тотальная бронезащита каждого сантиметра ЛКП премиальным полиуретаном. Заводской цвет сохраняется навсегда в идеале.',
    priceSedan: 140000,
    priceCrossover: 165000,
    priceSuv: 190000,
    pricePremium: 240000,
    durationHours: 24,
    warrantyYears: 10,
    features: [
      'Полная защита 100% кузовных панелей',
      'Пожизненный глянец без паутинки и микроцарапин',
      'Подворот всех кромок с микрозазором',
      'Сохранение высокой остаточной цены авто при продаже'
    ],
    filmBrands: ['STEK DYNOshield / DYNOmatte', 'LLumar Platinum Plus', 'SunTek Reaction'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vinyl-full-wrap',
    category: 'vinyl',
    titleKey: 'Полная смена цвета авто винилом',
    descriptionKey: 'Эксклюзивный стайлинг: трендовые цвета Nardo Grey, Satin Black, Khaki Green, Frozen Deep Blue, керамический глянец или матовый сатин.',
    priceSedan: 75000,
    priceCrossover: 88000,
    priceSuv: 105000,
    pricePremium: 135000,
    durationHours: 20,
    warrantyYears: 5,
    features: [
      'Более 300 оттенков и фактур в наличии в Бишкеке',
      'Полный разбор фурнитуры опытными арматурщиками',
      'Премиальные бренды без следов клея при демонтаже',
      'Возможность комбинирования цветов и крыши'
    ],
    filmBrands: ['Avery Dennison SW900', '3M 2080 Series', 'Oracal 970RA', 'KPMF'],
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'dechrome-shadow',
    category: 'vinyl',
    titleKey: 'Комплекс «Антихром» (Shadow Line)',
    descriptionKey: 'Оклейка хромированных молдингов вокруг окон, решетки радиатора, зеркал и шильдиков в глубокий черный глянец или сатин.',
    priceSedan: 12000,
    priceCrossover: 15000,
    priceSuv: 18000,
    pricePremium: 22000,
    durationHours: 4,
    warrantyYears: 4,
    features: [
      'Идеальный брутальный Night Package вид',
      'Защита хрупкого хрома от едких реагентов зимой',
      'Плотная посадка без вздутий и задиров',
      'Гарантия на мойку аппаратом высокого давления'
    ],
    filmBrands: ['Avery Dennison Gloss Black', '3M Gloss 2080'],
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'detailing-ceramic',
    category: 'detailing',
    titleKey: 'Глубокая полировка + Керамика 9H',
    descriptionKey: '3-этапная восстановительная полировка кузова с удалением до 95% царапин и нанесением 2-3 слоев нанокерамики Ceramic Pro / Krytex.',
    priceSedan: 18000,
    priceCrossover: 22000,
    priceSuv: 26000,
    pricePremium: 32000,
    durationHours: 12,
    warrantyYears: 3,
    features: [
      'Зеркальный карамельный блеск и глубина цвета',
      'Мощный водо- и грязеотталкивающий эффект (угол смачивания >110°)',
      'Защита от дорожных реагентов и птичьего помета',
      'УФ-фильтр против выгорания краски на солнце'
    ],
    filmBrands: ['Ceramic Pro 9H', 'Gyeon Quartz MOHS', 'Krytex Mega 8'],
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80'
  }
];

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

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    badge: 'ХИТ СЕЗОНА',
    title: 'Пакет «Зоны риска PPF» + Бронь фар в подарок',
    description: 'Защитите капот, бампер, крылья и зеркала полиуретаном STEK DYNOshield со скидкой 20% и получите бесплатную бронепленку на оптику.',
    discountPercent: 20,
    code: 'BISHKEK_PPF20',
    validUntil: '30 ноября 2026',
    accentColor: 'from-amber-500 to-orange-600',
    serviceCategory: 'ppf'
  },
  {
    id: 'promo-2',
    badge: 'ОНЛАЙН СКИДКА',
    title: '-15% на тонировку Llumar при записи с сайта',
    description: 'Запишитесь онлайн через наш сайт и получите мгновенную скидку 15% на оригинальную американскую тонировку Llumar ATR.',
    discountPercent: 15,
    code: 'LLUMAR_WEB15',
    validUntil: '15 декабря 2026',
    accentColor: 'from-blue-600 to-cyan-500',
    serviceCategory: 'tinting'
  },
  {
    id: 'promo-3',
    badge: 'ПОДАРОК ДЕТЕЙЛИНГА',
    title: 'Антидождь на все стекла при полной оклейке',
    description: 'При заказе полной оклейки автомобиля в винил или бронепленку дарим нанесение гидрофобного состава Aquapel на все стекла.',
    discountPercent: 25,
    code: 'FULL_AQUAPEL',
    validUntil: '31 декабря 2026',
    accentColor: 'from-emerald-500 to-teal-600',
    serviceCategory: 'vinyl'
  }
];

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

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'tint_permit',
    question: 'Разрешена ли тонировка передних боковых стекол в Кыргызстане?',
    answer: 'Да! С 2022 года в Кыргызской Республике официально разрешена платная тонировка передних боковых стекол. Разрешение выдается ГУ «Унаа» при МВД КР. Оформить заявку можно онлайн через госпортал «Түндүк» или в любом отделе «Унаа». Наши менеджеры бесплатно подскажут вам актуальный тариф госпошлины и помогут корректно подать данные.'
  },
  {
    id: 'faq-2',
    category: 'tint_permit',
    question: 'Нужно ли разрешение на тонировку задней полусферы авто?',
    answer: 'Нет! Задние боковые стекла и заднее стекло можно тонировать пленкой с любой степенью затемнения (хоть 5%) без оформления каких-либо разрешений и без штрафов согласно действующему ПДД Кыргызской Республики.'
  },
  {
    id: 'faq-3',
    category: 'ppf',
    question: 'Чем полиуретановая бронепленка (PPF) отличается от дешевого винила?',
    answer: 'Полиуретан (PPF) — это толстая (200+ микрон), эластичная и ударопрочная броня, способная выдерживать прямые удары щебня на скорости 120+ км/ч. Она имеет лаковый самозатягивающийся слой Top-Coat (царапины затягиваются сами от солнца или горячей воды). Винил же тоньше (80-100 микрон) и предназначен в основном для смены цвета, от тяжелых камней кузов он не спасает.'
  },
  {
    id: 'faq-4',
    category: 'warranty',
    question: 'Какая гарантия предоставляется на ваши работы и пленки?',
    answer: 'Мы даем официальную письменную гарантию: на антигравийные полиуретановые пленки STEK и LLumar — до 10 лет (от пожелтения, расслоения и пузырей), на тонировочные пленки LLumar — 7 лет, на цветной винил — до 5 лет. После оклейки мы приглашаем на бесплатный контрольный осмотр через 7-10 дней.'
  },
  {
    id: 'faq-5',
    category: 'care',
    question: 'Как правильно ухаживать за машиной после оклейки и тонировки?',
    answer: 'После тонировки стекол не открывайте окна в течение 3–4 дней, пока полностью не испарится влага под пленкой. После оклейки кузова бронепленкой или винилом воздержитесь от бесконтактной мойки в течение 7 дней. В дальнейшем предупреждайте мойщиков держать сопло аппарата высокого давления на расстоянии не ближе 30–40 см от краев деталей.'
  },
  {
    id: 'faq-6',
    category: 'care',
    question: 'Сколько по времени занимает тонировка и бронирование в вашей студии?',
    answer: 'Тонировка задней полусферы занимает около 1.5–2 часов. Тонировка вкруг — около 2.5–3 часов. Оклейка комплекса «Зоны риска» занимает 1 рабочий день (утром оставляете, вечером забираете). Полное бронирование кузова длится от 2 до 3 дней в зависимости от сложности авто.'
  }
];

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

