import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  city: string;
  address: string;
  workHours: string;
  phone: string;
  whatsapp: string;
  telegramBot: string;
  contactPerson: string;
  
  // Nav
  navServices: string;
  navCalculator: string;
  navGallery: string;
  navPrices: string;
  navReviews: string;
  navPromotions: string;
  navFaq: string;
  navContacts: string;
  bookOnlineBtn: string;
  myCabinet: string;
  adminPanel: string;

  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCtaBook: string;
  heroCtaCalc: string;
  heroFeature1: string;
  heroFeature2: string;
  heroFeature3: string;
  heroFeature4: string;
  statClients: string;
  statWarranty: string;
  statExperience: string;
  statRating: string;

  // Car categories
  carSedan: string;
  carCrossover: string;
  carSuv: string;
  carPremium: string;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  allCategories: string;
  catTinting: string;
  catPpf: string;
  catVinyl: string;
  catDetailing: string;
  warrantyYearsText: string;
  durationText: string;
  fromPrice: string;
  detailsBtn: string;
  selectService: string;

  // Calculator
  calcTitle: string;
  calcSubtitle: string;
  chooseVehicle: string;
  chooseServices: string;
  chooseFilm: string;
  totalCost: string;
  approxDuration: string;
  bookWithConfig: string;

  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  beforeAfterNotice: string;
  beforeText: string;
  afterText: string;

  // Reviews
  reviewsTitle: string;
  reviewsSubtitle: string;
  writeReviewBtn: string;
  averageRating: string;
  verifiedClient: string;

  // Promotions
  promotionsTitle: string;
  promotionsSubtitle: string;
  promoCode: string;
  copyCode: string;
  copied: string;
  validUntil: string;
  applyPromo: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  tintPermitAlert: string;
  tintPermitAlertDesc: string;

  // Location & Contact
  locationTitle: string;
  locationSubtitle: string;
  findOn2gis: string;
  findOnYandex: string;
  openGoogleMaps: string;
  chatWhatsapp: string;
  directCall: string;

  // Booking Modal
  bookingModalTitle: string;
  stepCar: string;
  stepService: string;
  stepMaster: string;
  stepDateTime: string;
  stepPayment: string;
  nextStep: string;
  prevStep: string;
  confirmBooking: string;
  selectDate: string;
  selectTime: string;
  clientNameLabel: string;
  clientPhoneLabel: string;
  notesLabel: string;
  permitCheckboxLabel: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;

  // Payments
  paymentMbank: string;
  paymentOdengi: string;
  paymentOptima: string;
  paymentCard: string;
  paymentCash: string;

  // Cabinet
  cabinetTitle: string;
  cabinetOrders: string;
  cabinetGarage: string;
  cabinetSecurity: string;
  cabinetBonus: string;
  bonusPoints: string;
  statusPending: string;
  statusInProgress: string;
  statusReady: string;
  statusCompleted: string;
  exportPdf: string;
  exportCsv: string;
  twoFactorAuth: string;
  twoFactorDesc: string;
  securityLogs: string;

  // Telegram
  telegramNotifySent: string;
  telegramBotAlert: string;

  // Footer
  footerRights: string;
  footerDisclaimer: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appName: "TONIX TINT STUDIO",
    tagline: "Премиальный центр тонирования и бронирования авто",
    city: "Бишкек, Кыргызстан",
    address: "Проспект Жибек-Жолу, 730/1, Ленинский район, г. Бишкек, 720033",
    workHours: "Ежедневно: 09:00 – 21:00 (без выходных)",
    phone: "+996 700 910 777",
    whatsapp: "+996 700 910 777",
    telegramBot: "@TonixTintStudio_bot",
    contactPerson: "Кадырбеков Арген (Шеф-мастер & Контактное лицо)",

    navServices: "Услуги",
    navCalculator: "Калькулятор",
    navGallery: "Галерея (До/После)",
    navPrices: "Прайс-лист",
    navReviews: "Отзывы",
    navPromotions: "Акции",
    navFaq: "FAQ и Закон",
    navContacts: "Контакты",
    bookOnlineBtn: "Записаться онлайн",
    myCabinet: "Личный кабинет",
    adminPanel: "CRM Мастера",

    heroBadge: "Бишкек • Официальный сертифицированный центр LLumar & STEK",
    heroTitle1: "Идеальная тонировка и",
    heroTitleHighlight: "бронепленка PPF",
    heroTitle2: "для вашего автомобиля",
    heroSubtitle: "Защита кузова премиальным полиуретаном, ГОСТ-тонировка с помощью в оформлении разрешения, атермальные пленки и детейлинг высшего класса.",
    heroCtaBook: "Записаться на удобное время",
    heroCtaCalc: "Рассчитать стоимость онлайн",
    heroFeature1: "Гарантия до 10 лет без выгорания и отслоений",
    heroFeature2: "Стерильные чистые боксы с климат-контролем",
    heroFeature3: "Помощь с разрешением на тонировку в ГУ «Унаа»",
    heroFeature4: "Оригинальные пленки США и Кореи (LLumar, STEK, SunTek)",
    statClients: "4 850+ оклеенных авто",
    statWarranty: "до 10 лет гарантия",
    statExperience: "9+ лет опыта мастеров",
    statRating: "4.9 / 5.0 (520+ отзывов)",

    carSedan: "Седан / Хэтчбек",
    carCrossover: "Кроссовер",
    carSuv: "Внедорожник / Пикап",
    carPremium: "Премиум / Представительский",

    servicesTitle: "Услуги и пакеты премиум детейлинга",
    servicesSubtitle: "Используем только сертифицированные американские и европейские пленки с официальной гарантией.",
    allCategories: "Все услуги",
    catTinting: "Тонирование стекол",
    catPpf: "Бронепленка (PPF)",
    catVinyl: "Виниловый стайлинг",
    catDetailing: "Полировка и керамика",
    warrantyYearsText: "лет гарантии",
    durationText: "ч. среднее время",
    fromPrice: "от",
    detailsBtn: "Подробнее",
    selectService: "Выбрать",

    calcTitle: "Интерактивный калькулятор стоимости",
    calcSubtitle: "Узнайте точную стоимость работ под ваш автомобиль за 30 секунд",
    chooseVehicle: "1. Выберите класс автомобиля",
    chooseServices: "2. Выберите комплекс или зоны защиты",
    chooseFilm: "3. Выберите бренд пленки",
    totalCost: "Итоговая стоимость",
    approxDuration: "Ориентировочное время:",
    bookWithConfig: "Записаться по этому расчету",

    galleryTitle: "Галерея наших работ: До и После",
    gallerySubtitle: "Потяните ползунок, чтобы увидеть преображение автомобиля после тонировки и бронирования.",
    beforeAfterNotice: "Передвигайте слайдер влево-вправо для сравнения",
    beforeText: "ДО (Заводской вид)",
    afterText: "ПОСЛЕ (Tonix Tint)",

    reviewsTitle: "Отзывы автолюбителей Бишкека",
    reviewsSubtitle: "Честные отзывы владельцев Lexus, BMW, Zeekr, Toyota и других авто о нашей работе.",
    writeReviewBtn: "Оставить отзыв",
    averageRating: "Средний рейтинг студии",
    verifiedClient: "Подтвержденный клиент",

    promotionsTitle: "Горячие акции и спецпредложения",
    promotionsSubtitle: "Сэкономьте до 25% на оклейке и получите подарки при онлайн-записи в этом месяце.",
    promoCode: "Промокод:",
    copyCode: "Скопировать",
    copied: "Скопировано!",
    validUntil: "Действует до",
    applyPromo: "Применить к записи",

    faqTitle: "Часто задаваемые вопросы (FAQ)",
    faqSubtitle: "Всё о законе по тонировке в Кыргызстане, свойствах пленок и гарантиях.",
    tintPermitAlert: "Официальное разрешение на тонировку передних стекол в КР:",
    tintPermitAlertDesc: "Согласно законодательству Кыргызской Республики, тонировка передних боковых стекол разрешена при наличии разрешения ГУ «Унаа» МВД КР. Мы бесплатно консультируем и помогаем оформить заявку через Госуслуги Tunduk!",

    locationTitle: "Где мы находимся в Бишкеке",
    locationSubtitle: "Удобный заезд, охраняемая закрытая парковка и уютная клиентская лаунж-зона с зерновым кофе и Wi-Fi.",
    findOn2gis: "Открыть в 2ГИС Бишкек",
    findOnYandex: "Маршрут в Яндекс Карты",
    openGoogleMaps: "Google Карты",
    chatWhatsapp: "Написать в WhatsApp",
    directCall: "Позвонить администратору",

    bookingModalTitle: "Онлайн-запись в студию",
    stepCar: "Автомобиль",
    stepService: "Услуга",
    stepMaster: "Мастер",
    stepDateTime: "Дата и время",
    stepPayment: "Оплата",
    nextStep: "Далее",
    prevStep: "Назад",
    confirmBooking: "Подтвердить запись",
    selectDate: "Выберите дату",
    selectTime: "Выберите удобное время",
    clientNameLabel: "Ваше имя",
    clientPhoneLabel: "Номер телефона (Кыргызстан)",
    notesLabel: "Комментарий / Пожелания к авто",
    permitCheckboxLabel: "Нужна консультация по разрешению на тонировку МВД КР",
    bookingSuccessTitle: "Запись успешно оформлена!",
    bookingSuccessDesc: "Мы забронировали бокс. Менеджер свяжется с вами за 1 час до визита. Уведомление отправлено в Telegram-бот студии.",

    paymentMbank: "MBank QR (0% комиссии)",
    paymentOdengi: "О!Деньги / Мой О!",
    paymentOptima: "Optima Bank QR",
    paymentCard: "Банковская карта (Visa / Elkart / MasterCard)",
    paymentCash: "Оплата при получении авто в студии",

    cabinetTitle: "Личный кабинет клиента",
    cabinetOrders: "Мои заказы",
    cabinetGarage: "Гараж",
    cabinetSecurity: "Безопасность (2FA)",
    cabinetBonus: "Бонусная программа",
    bonusPoints: "Накопленный кэшбэк",
    statusPending: "Ожидает визита",
    statusInProgress: "В работе в боксе",
    statusReady: "Готов к выдаче",
    statusCompleted: "Завершен",
    exportPdf: "Скачать гарантийный талон (PDF)",
    exportCsv: "Экспорт истории (CSV)",
    twoFactorAuth: "Двухфакторная аутентификация (2FA)",
    twoFactorDesc: "Защита аккаунта и истории автомобиля через SMS-код или приложение Google Authenticator.",
    securityLogs: "Журнал сессий и безопасности",

    telegramNotifySent: "Уведомление успешно доставлено в Telegram бот @TonixTintStudio_bot",
    telegramBotAlert: "Заявка передана дежурному мастеру",

    footerRights: "© 2026 TONIX TINT STUDIO. Все права защищены.",
    footerDisclaimer: "Все используемые материалы сертифицированы в КР. Гарантия поддерживается при соблюдении регламента ухода за пленками."
  },

  kg: {
    appName: "TONIX TINT STUDIO",
    tagline: "Бишкектеги автоунааны тонировкалоо жана брондоо борбору",
    city: "Бишкек, Кыргызстан",
    address: "Жибек-Жолу проспекти, 730/1, Ленин району, Бишкек ш., 720033",
    workHours: "Күн сайын: 09:00 – 21:00 (дем алышсыз)",
    phone: "+996 700 910 777",
    whatsapp: "+996 700 910 777",
    telegramBot: "@TonixTintStudio_bot",
    contactPerson: "Кадырбеков Арген (Башкы мастер & Байланыш адамы)",

    navServices: "Кызматтар",
    navCalculator: "Калькулятор",
    navGallery: "Галерея (Мурда/Кийин)",
    navPrices: "Баалар",
    navReviews: "Пикирлер",
    navPromotions: "Акциялар",
    navFaq: "Суроолор жана Мыйзам",
    navContacts: "Байланышуу",
    bookOnlineBtn: "Онлайн жазылуу",
    myCabinet: "Жеке кабинет",
    adminPanel: "CRM Башкаруу",

    heroBadge: "Бишкек • Расмий сертифатталган LLumar & STEK борбору",
    heroTitle1: "Мыкты тонировка жана",
    heroTitleHighlight: "PPF бронепленка",
    heroTitle2: "сиздин автоунааңыз үчүн",
    heroSubtitle: "Кузовду жогорку сапаттагы полиуретан менен коргоо, КР ГОСТу боюнча тонировкалоо, уруксат алууга жардам берүү жана жогорку деңгээлдеги детейлинг.",
    heroCtaBook: "Ыңгайлуу убакытка жазылуу",
    heroCtaCalc: "Баасын онлайн эсептөө",
    heroFeature1: "10 жылга чейин расмий кепилдик",
    heroFeature2: "Таза, чаңсыз климат-контролу бар бокстар",
    heroFeature3: "«Унаа» мекемесинен тонировкага уруксат алууга көмөк",
    heroFeature4: "АКШ жана Кореянын түпнуска пленкалары (LLumar, STEK)",
    statClients: "4 850+ капталган авто",
    statWarranty: "10 жылга чейин кепилдик",
    statExperience: "9+ жылдык тажрыйба",
    statRating: "4.9 / 5.0 (520+ пикир)",

    carSedan: "Седан / Хэтчбек",
    carCrossover: "Кроссовер",
    carSuv: "Жол тандабас / Пикап",
    carPremium: "Премиум класс",

    servicesTitle: "Премиум детейлинг кызматтары",
    servicesSubtitle: "Расмий кепилдиги бар АКШ жана Европалык оригиналдуу пленкаларды гана колдонобуз.",
    allCategories: "Бардык кызматтар",
    catTinting: "Терезелерди тонировкалоо",
    catPpf: "Бронепленка (PPF)",
    catVinyl: "Винил стайлинг",
    catDetailing: "Жылмалоо жана керамика",
    warrantyYearsText: "жыл кепилдик",
    durationText: "саат орточо убакыт",
    fromPrice: "баштап",
    detailsBtn: "Толук маалымат",
    selectService: "Тандоо",

    calcTitle: "Интерактивдүү баа калькулятору",
    calcSubtitle: "Автоунааңыз үчүн так бааны 30 секундада билиңиз",
    chooseVehicle: "1. Автоунаанын классын тандаңыз",
    chooseServices: "2. Кызматты же коргоо зоналарын тандаңыз",
    chooseFilm: "3. Пленканын брендин тандаңыз",
    totalCost: "Жалпы баасы",
    approxDuration: "Болжолдуу убакыт:",
    bookWithConfig: "Ушул баа менен жазылуу",

    galleryTitle: "Биздин иштер: Мурда жана Кийин",
    gallerySubtitle: "Тонировка жана коргоодон кийинки өзгөрүүнү көрүү үчүн сыдыргычты жылдырыңыз.",
    beforeAfterNotice: "Салыштыруу үчүн сыдыргычты оңго-солго жылдырыңыз",
    beforeText: "МУРДА (Заводдук көрүнүш)",
    afterText: "КИЙИН (Tonix Tint)",

    reviewsTitle: "Бишкектеги кардарлардын пикирлери",
    reviewsSubtitle: "Биздин ишибиз тууралуу унаа ээлеринин чынчыл баалоолору.",
    writeReviewBtn: "Пикир калтыруу",
    averageRating: "Орточо рейтинг",
    verifiedClient: "Тастыкталган кардар",

    promotionsTitle: "Атайын сунуштар жана акциялар",
    promotionsSubtitle: "Онлайн жазылууда 25% чейин үнөмдөңүз жана белектерге ээ болуңуз.",
    promoCode: "Промокод:",
    copyCode: "Көчүрүп алуу",
    copied: "Көчүрүлдү!",
    validUntil: "Мөөнөтү",
    applyPromo: "Жазылууга колдонуу",

    faqTitle: "Көп берилүүчү суроолор (FAQ)",
    faqSubtitle: "Кыргызстандагы тонировка мыйзамы, пленкалардын сапаты жана кепилдик жөнүндө.",
    tintPermitAlert: "Алдыңкы терезелерди тонировкалоого расмий уруксат:",
    tintPermitAlertDesc: "КР мыйзамына ылайык, алдыңкы каптал терезелерди тонировкалоо КР ИИМ «Унаа» мекемесинин уруксаты менен мүмкүн. Биз Түндүк аркылуу документ толтурууга акысыз жардам беребиз!",

    locationTitle: "Биздин дарек Бишкекте",
    locationSubtitle: "Ыңгайлуу кирүү жолу, коопсуз унаа токтотуучу жай жана акысыз кофеси бар эс алуу бөлмөсү.",
    findOn2gis: "2ГИС Бишкектен ачуу",
    findOnYandex: "Яндекс Картадан маршрут",
    openGoogleMaps: "Google Карталар",
    chatWhatsapp: "WhatsApp аркылуу жазуу",
    directCall: "Чалуу",

    bookingModalTitle: "Студияга онлайн жазылуу",
    stepCar: "Автоунаа",
    stepService: "Кызмат",
    stepMaster: "Мастер",
    stepDateTime: "Күн жана убакыт",
    stepPayment: "Төлөм",
    nextStep: "Андан ары",
    prevStep: "Артка",
    confirmBooking: "Жазылууну тастыктоо",
    selectDate: "Күндү тандаңыз",
    selectTime: "Ыңгайлуу убакытты тандаңыз",
    clientNameLabel: "Сиздин атыңыз",
    clientPhoneLabel: "Телефон номериңиз (Кыргызстан)",
    notesLabel: "Каалоо-тилектер",
    permitCheckboxLabel: "Тонировкага уруксат алуу боюнча кеңеш керек",
    bookingSuccessTitle: "Ийгиликтүү жазылдыңыз!",
    bookingSuccessDesc: "Сиз үчүн бокс даярдалууда. Администратор 1 саат мурун байланышат. Маалымат студиянын Telegram-ботуна жиберилди.",

    paymentMbank: "MBank QR (комиссиясыз)",
    paymentOdengi: "О!Деньги / Мой О!",
    paymentOptima: "Optima Bank QR",
    paymentCard: "Банк картасы (Элкарт / Visa)",
    paymentCash: "Студиядан накталай төлөө",

    cabinetTitle: "Кардардын жеке кабинети",
    cabinetOrders: "Менин буйрутмаларым",
    cabinetGarage: "Гараж",
    cabinetSecurity: "Коопсуздук (2FA)",
    cabinetBonus: "Бонус программасы",
    bonusPoints: "Топтолгон кэшбэк",
    statusPending: "Күтүлүүдө",
    statusInProgress: "Иштеп жатат",
    statusReady: "Даяр",
    statusCompleted: "Бүттү",
    exportPdf: "Кепилдик кагазын көчүрүү (PDF)",
    exportCsv: "Тарыхты экспорттоо (CSV)",
    twoFactorAuth: "Эки баскычтуу коргоо (2FA)",
    twoFactorDesc: "SMS-код же Authenticator тиркемеси аркылуу аккаунтту коргоо.",
    securityLogs: "Коопсуздук журналы",

    telegramNotifySent: "Билдирүү @TonixTintStudio_bot Telegram ботуна жөнөтүлдү",
    telegramBotAlert: "Өтүнмө нөөмөттөгү мастерге жеткирилди",

    footerRights: "© 2026 TONIX TINT STUDIO. Бардык укуктар корголгон.",
    footerDisclaimer: "Колдонулган материалдар КРде тастыкталган. Пленкаларды туура багуу эрежелери сакталганда кепилдик берилет."
  },

  en: {
    appName: "TONIX TINT STUDIO",
    tagline: "Premium Auto Tinting & PPF Wrapping Studio",
    city: "Bishkek, Kyrgyzstan",
    address: "730/1 Zhibek-Zholu Ave, Leninsky district, Bishkek, 720033",
    workHours: "Daily: 09:00 AM – 09:00 PM (No days off)",
    phone: "+996 700 910 777",
    whatsapp: "+996 700 910 777",
    telegramBot: "@TonixTintStudio_bot",
    contactPerson: "Argen Kadyrbekov (Chief Specialist & Contact Person)",

    navServices: "Services",
    navCalculator: "Calculator",
    navGallery: "Before / After",
    navPrices: "Pricing",
    navReviews: "Reviews",
    navPromotions: "Deals",
    navFaq: "FAQ & Law",
    navContacts: "Location",
    bookOnlineBtn: "Book Online",
    myCabinet: "My Account",
    adminPanel: "Master CRM",

    heroBadge: "Bishkek • Official Certified LLumar & STEK Center",
    heroTitle1: "Precision Car Tinting &",
    heroTitleHighlight: "PPF Armor Wrapping",
    heroTitle2: "for your beloved vehicle",
    heroSubtitle: "Paint protection film with self-healing properties, Kyrgyz tint regulations assistance, ceramic heat rejection, and expert detailing.",
    heroCtaBook: "Schedule Appointment",
    heroCtaCalc: "Estimate Price Online",
    heroFeature1: "Up to 10-Year official warranty",
    heroFeature2: "Sterile dust-free climate controlled bays",
    heroFeature3: "Assistance with official KG tint permit",
    heroFeature4: "Genuine USA & Korean films (LLumar, STEK, SunTek)",
    statClients: "4,850+ Vehicles Protected",
    statWarranty: "Up to 10 yrs Warranty",
    statExperience: "9+ Years Master Expertise",
    statRating: "4.9 / 5.0 (520+ Reviews)",

    carSedan: "Sedan / Hatchback",
    carCrossover: "Crossover / Compact SUV",
    carSuv: "Full-size SUV / Truck",
    carPremium: "Luxury / Executive",

    servicesTitle: "Detailing & Protection Packages",
    servicesSubtitle: "We use only genuine American and European films backed by a manufacturer warranty.",
    allCategories: "All Services",
    catTinting: "Window Tinting",
    catPpf: "Paint Protection Film (PPF)",
    catVinyl: "Vinyl Styling",
    catDetailing: "Polishing & Ceramic",
    warrantyYearsText: "years warranty",
    durationText: "hrs average time",
    fromPrice: "from",
    detailsBtn: "Details",
    selectService: "Select",

    calcTitle: "Interactive Cost Calculator",
    calcSubtitle: "Get an accurate quote for your car model in under 30 seconds",
    chooseVehicle: "1. Select Vehicle Category",
    chooseServices: "2. Choose Package or Protection Zones",
    chooseFilm: "3. Choose Film Manufacturer",
    totalCost: "Estimated Total",
    approxDuration: "Estimated Duration:",
    bookWithConfig: "Book With This Estimate",

    galleryTitle: "Work Showcase: Before and After",
    gallerySubtitle: "Drag the slider to witness the transformation after professional tinting and PPF wrapping.",
    beforeAfterNotice: "Slide left and right to inspect the transformation",
    beforeText: "BEFORE (Stock look)",
    afterText: "AFTER (Tonix Tint finish)",

    reviewsTitle: "Verified Bishkek Customer Reviews",
    reviewsSubtitle: "Real ratings from local owners of Lexus, BMW, Zeekr, Toyota, and Mercedes.",
    writeReviewBtn: "Write a Review",
    averageRating: "Studio Average Rating",
    verifiedClient: "Verified Customer",

    promotionsTitle: "Exclusive Special Offers",
    promotionsSubtitle: "Save up to 25% on PPF wrap and receive complimentary headlight armor with online booking.",
    promoCode: "Promo Code:",
    copyCode: "Copy Code",
    copied: "Copied!",
    validUntil: "Valid until",
    applyPromo: "Apply to Booking",

    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSubtitle: "Everything regarding Kyrgyzstan tint regulations, film durability, and warranty.",
    tintPermitAlert: "Official Front Side Window Tint Law in Kyrgyzstan:",
    tintPermitAlertDesc: "Front side window tinting is fully legal in Kyrgyzstan with an official permit from 'Unaa' state agency under MIA KR. We guide you and help file via Tunduk portal!",

    locationTitle: "Studio Location in Bishkek",
    locationSubtitle: "Convenient driveway, guarded parking lot, and modern lounge with specialty coffee & Wi-Fi.",
    findOn2gis: "Open in 2GIS Bishkek",
    findOnYandex: "Route in Yandex Maps",
    openGoogleMaps: "Google Maps",
    chatWhatsapp: "Chat on WhatsApp",
    directCall: "Call Reception",

    bookingModalTitle: "Online Appointment Booking",
    stepCar: "Vehicle",
    stepService: "Service",
    stepMaster: "Specialist",
    stepDateTime: "Date & Time",
    stepPayment: "Payment",
    nextStep: "Next",
    prevStep: "Back",
    confirmBooking: "Confirm Booking",
    selectDate: "Select Date",
    selectTime: "Select Time Slot",
    clientNameLabel: "Full Name",
    clientPhoneLabel: "Phone Number (KG)",
    notesLabel: "Notes / Special Requests",
    permitCheckboxLabel: "Request consultation for official KR tinting permit",
    bookingSuccessTitle: "Booking Confirmed!",
    bookingSuccessDesc: "Bay has been reserved for your vehicle. Our manager will call you 1 hour prior to appointment. Telegram bot notification has been dispatched.",

    paymentMbank: "MBank QR (Instant, 0% fee)",
    paymentOdengi: "O!Dengi / My O!",
    paymentOptima: "Optima Bank QR",
    paymentCard: "Credit / Debit Card (Visa / Elkart / MC)",
    paymentCash: "Pay at Studio upon Inspection",

    cabinetTitle: "Customer Portal",
    cabinetOrders: "My Bookings",
    cabinetGarage: "My Garage",
    cabinetSecurity: "Security (2FA)",
    cabinetBonus: "Loyalty Cashback",
    bonusPoints: "Available Cashback",
    statusPending: "Awaiting Arrival",
    statusInProgress: "In Bay / Working",
    statusReady: "Ready for Pickup",
    statusCompleted: "Completed",
    exportPdf: "Download Warranty Certificate (PDF)",
    exportCsv: "Export History (CSV)",
    twoFactorAuth: "Two-Factor Authentication (2FA)",
    twoFactorDesc: "Protect your account and vehicle history with SMS code or Google Authenticator.",
    securityLogs: "Security & Login Audit Logs",

    telegramNotifySent: "Notification dispatched to @TonixTintStudio_bot",
    telegramBotAlert: "Booking transferred to bay master",

    footerRights: "© 2026 TONIX TINT STUDIO. All rights reserved.",
    footerDisclaimer: "All films are certified in Kyrgyz Republic. Warranty applies when maintenance guidelines are observed."
  }
};
