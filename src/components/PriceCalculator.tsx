import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CarCategory } from '../types';
import { 
  Calculator, 
  Car, 
  Check, 
  Clock, 
  Shield, 
  Sparkles, 
  Tag, 
  ArrowRight,
  Layers,
  Info
} from 'lucide-react';

interface CalcOption {
  id: string;
  title: string;
  category: 'tinting' | 'ppf' | 'vinyl' | 'detailing';
  prices: Record<CarCategory, number>;
  hours: number;
  warrantyYears: number;
  description: string;
}

const CALC_OPTIONS: CalcOption[] = [
  {
    id: 'opt-tint-rear',
    title: 'Тонировка задней полусферы (ГОСТ КР)',
    category: 'tinting',
    prices: { sedan: 4500, crossover: 5500, suv: 6500, premium: 8000 },
    hours: 2,
    warrantyYears: 7,
    description: 'Задние боковые + заднее стекло. Разрешение МВД не требуется.'
  },
  {
    id: 'opt-tint-front',
    title: 'Тонировка передних боковых стекол',
    category: 'tinting',
    prices: { sedan: 3500, crossover: 4000, suv: 4500, premium: 5500 },
    hours: 1.5,
    warrantyYears: 7,
    description: 'Платное разрешение в ГУ «Унаа» (бесплатно помогаем оформить в Түндүк).'
  },
  {
    id: 'opt-tint-atherm',
    title: 'Атермальная пленка (Лобовое + боковые)',
    category: 'tinting',
    prices: { sedan: 8000, crossover: 9500, suv: 11000, premium: 14000 },
    hours: 2.5,
    warrantyYears: 8,
    description: 'Отражение 88% солнечного жара. Проходит ГОСТ по светопропусканию.'
  },
  {
    id: 'opt-ppf-risk',
    title: 'Бронирование «Зоны риска» (PPF полиуретан)',
    category: 'ppf',
    prices: { sedan: 45000, crossover: 52000, suv: 60000, premium: 75000 },
    hours: 8,
    warrantyYears: 10,
    description: 'Капот целиком, бампер, фары, передние крылья, зеркала, пороги.'
  },
  {
    id: 'opt-ppf-full',
    title: 'Полное бронирование кузова (Full PPF)',
    category: 'ppf',
    prices: { sedan: 140000, crossover: 165000, suv: 190000, premium: 240000 },
    hours: 24,
    warrantyYears: 10,
    description: '100% кузова в американский антигравийный полиуретан STEK / LLumar.'
  },
  {
    id: 'opt-dechrome',
    title: 'Комплекс «Антихром» (Shadow Line)',
    category: 'vinyl',
    prices: { sedan: 12000, crossover: 15000, suv: 18000, premium: 22000 },
    hours: 4,
    warrantyYears: 4,
    description: 'Оклейка хрома оконных молдингов, решетки и зеркал в черный глянец.'
  },
  {
    id: 'opt-vinyl-full',
    title: 'Полная смена цвета винилом',
    category: 'vinyl',
    prices: { sedan: 75000, crossover: 88000, suv: 105000, premium: 135000 },
    hours: 20,
    warrantyYears: 5,
    description: 'Avery Dennison / 3M. Более 300 оттенков: Nardo, Satin Black и др.'
  },
  {
    id: 'opt-ceramic',
    title: 'Полировка кузова + Керамика 9H Pro',
    category: 'detailing',
    prices: { sedan: 18000, crossover: 22000, suv: 26000, premium: 32000 },
    hours: 10,
    warrantyYears: 3,
    description: 'Глубокая восстановительная полировка + 2 слоя нанокерамики.'
  }
];

export const PriceCalculator: React.FC = () => {
  const { t, openBookingWithPreselect, activePromoCode, setActivePromoCode } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('crossover');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['opt-tint-rear', 'opt-ppf-risk']);
  const [selectedFilmBrand, setSelectedFilmBrand] = useState<string>('STEK DYNOshield / LLumar (USA)');
  const [promoInput, setPromoInput] = useState<string>(activePromoCode || '');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const carTypes: { id: CarCategory; name: string; example: string }[] = [
    { id: 'sedan', name: t.carSedan, example: 'Camry, BMW 3/5, Sonata, Zeekr 007' },
    { id: 'crossover', name: t.carCrossover, example: 'RAV4, RX350, CR-V, Sportage, Geely Monjaro' },
    { id: 'suv', name: t.carSuv, example: 'Lexus LX, Land Cruiser 200/300, Prado, Li L9' },
    { id: 'premium', name: t.carPremium, example: 'G-Class, Porsche Cayenne, Range Rover, S-Class' }
  ];

  const filmBrands = [
    { name: 'STEK DYNOshield / LLumar (USA)', multiplier: 1.0, badge: 'Топ выбор в Бишкеке' },
    { name: 'SunTek Ultra PPF (USA)', multiplier: 0.95, badge: 'Премиум США' },
    { name: 'Hexis Bodyfence X (Франция)', multiplier: 0.92, badge: 'Французский глянец' },
    { name: 'Avery Dennison SW900 (США/Нидерланды)', multiplier: 0.95, badge: 'Лидер винила' }
  ];

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter(o => o !== id));
      }
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'BISHKEK_PPF20' || code === 'PPF20') {
      setActivePromoCode('BISHKEK_PPF20');
      setPromoMessage('✅ Промокод активирован: скидка 20% на услуги!');
    } else if (code === 'LLUMAR_WEB15' || code === 'WEB15') {
      setActivePromoCode('LLUMAR_WEB15');
      setPromoMessage('✅ Промокод активирован: скидка 15%!');
    } else if (code.length > 0) {
      setPromoMessage('❌ Промокод не найден или истек срок действия');
    }
  };

  const discountPercent = useMemo(() => {
    if (activePromoCode === 'BISHKEK_PPF20') return 0.20;
    if (activePromoCode === 'LLUMAR_WEB15') return 0.15;
    return 0;
  }, [activePromoCode]);

  const calculation = useMemo(() => {
    const activeOpts = CALC_OPTIONS.filter(o => selectedOptions.includes(o.id));
    const baseTotal = activeOpts.reduce((acc, opt) => acc + opt.prices[selectedCategory], 0);
    const filmMult = filmBrands.find(b => b.name === selectedFilmBrand)?.multiplier || 1;
    const rawTotal = Math.round(baseTotal * filmMult);
    const finalTotal = Math.round(rawTotal * (1 - discountPercent));
    const totalHours = activeOpts.reduce((acc, opt) => acc + opt.hours, 0);

    return {
      rawTotal,
      finalTotal,
      savings: rawTotal - finalTotal,
      totalHours,
      activeOpts
    };
  }, [selectedCategory, selectedOptions, selectedFilmBrand, discountPercent]);

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>ОНЛАЙН КАЛЬКУЛЯТОР БИШКЕК</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.calcTitle}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {t.calcSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configuration Form (Left side) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Car Category */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-4">
                <Car className="w-4 h-4" />
                <span>{t.chooseVehicle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {carTypes.map(c => {
                  const isSelected = selectedCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{c.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{c.example}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Services */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Layers className="w-4 h-4" />
                  <span>{t.chooseServices}</span>
                </div>
                <span className="text-xs text-slate-400">
                  Выбрано: {selectedOptions.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALC_OPTIONS.map(opt => {
                  const isSelected = selectedOptions.includes(opt.id);
                  const price = opt.prices[selectedCategory];

                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-500/10'
                          : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-sm text-slate-100">{opt.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{opt.description}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'border border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-amber-400 text-sm">
                          {price.toLocaleString()} KGS
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <span>~{opt.hours} ч.</span>
                          <span>•</span>
                          <span>{opt.warrantyYears} лет гар.</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Film Brand */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-4">
                <Shield className="w-4 h-4" />
                <span>{t.chooseFilm}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filmBrands.map(b => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedFilmBrand(b.name)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFilmBrand === b.name
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                      <span>{b.name}</span>
                      {selectedFilmBrand === b.name && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-medium mt-1">{b.badge}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Total Calculation Summary (Right side) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-5 glow-amber">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                    {t.totalCost}
                  </span>
                  <div className="text-3xl font-black text-white mt-1">
                    {calculation.finalTotal.toLocaleString()} <span className="text-amber-400 text-xl font-bold">KGS</span>
                  </div>
                </div>
                {discountPercent > 0 && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                    -{discountPercent * 100}% Скидка
                  </div>
                )}
              </div>

              {/* Time & warranty summary */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">{t.approxDuration}</div>
                  <div className="font-bold text-slate-200 mt-0.5">~{calculation.totalHours} часов</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Официальная гарантия:</div>
                  <div className="font-bold text-amber-400 mt-0.5">до 10 лет</div>
                </div>
              </div>

              {/* Breakdown of items */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-bold text-slate-300">Включено в расчет:</div>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {calculation.activeOpts.map(o => (
                    <li key={o.id} className="flex items-center justify-between">
                      <span className="truncate pr-2">• {o.title}</span>
                      <span className="text-slate-200 shrink-0 font-medium">
                        {o.prices[selectedCategory].toLocaleString()} KGS
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Promo code field */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Промокод на скидку:</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Например: BISHKEK_PPF20"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white shrink-0 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[11px] mt-1.5 font-medium text-amber-400">{promoMessage}</p>
                )}
              </div>

              {/* Legal tip for Kyrgyzstan */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-[11px] text-blue-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Помогаем официально оформить разрешение на тонировку передних стекол в ГУ «Унаа» МВД КР!
                </span>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  const firstServiceId = calculation.activeOpts[0]?.id?.replace('opt-', '') || 'tint-rear';
                  openBookingWithPreselect(firstServiceId, selectedCategory);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.bookWithConfig}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
