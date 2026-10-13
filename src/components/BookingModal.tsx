import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CarCategory, Master, ServiceItem } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Car, 
  Layers, 
  Users, 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  FileText,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { TonixLogo } from './TonixLogo';
import { discountedPrice, findPromotion, servicePrice } from '../utils/pricing';
import { fetchTakenSlots } from '../utils/api';
import { getWhatsappUrl } from '../utils/socialUtils';

// Dates as YYYY-MM-DD in the visitor's local time zone (toISOString would use UTC).
const localDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const BookingModal: React.FC = () => {
  const { 
    t, 
    isBookingOpen, 
    setIsBookingOpen, 
    setIsCabinetOpen,
    clientProfile,
    services, 
    masters, 
    addBooking, 
    activePromoCode,
    promotions,
    bookingPreselection,
    studioSettings
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [carCategory, setCarCategory] = useState<CarCategory>('crossover');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  const [selectedServiceId, setSelectedServiceId] = useState<string>('tint-rear');
  const [selectedFilmBrand, setSelectedFilmBrand] = useState<string>('LLumar ATR (USA)');
  const [selectedMasterId, setSelectedMasterId] = useState<string>('master-argen');

  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return localDate(tomorrow);
  });
  const [bookingTime, setBookingTime] = useState<string>('11:30');
  const [takenSlots, setTakenSlots] = useState<{ masterId: string; time: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+996 ');
  const [notes, setNotes] = useState('');
  const [tintPermitAssistance, setTintPermitAssistance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mbank' | 'odengi' | 'optima' | 'card' | 'cash'>('mbank');

  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Fill contact details from the client's account
  useEffect(() => {
    if (isBookingOpen && clientProfile) {
      setClientName(prev => prev.trim() ? prev : clientProfile.name);
      setClientPhone(clientProfile.phone);
    }
  }, [isBookingOpen, clientProfile]);

  // Sync with preselected values if opened from a button
  useEffect(() => {
    if (bookingPreselection) {
      if (bookingPreselection.serviceId) {
        setSelectedServiceId(bookingPreselection.serviceId);
      }
      if (bookingPreselection.carCategory) {
        setCarCategory(bookingPreselection.carCategory);
      }
    }
  }, [bookingPreselection]);

  // Slots already booked on the chosen date, so the client can't pick them.
  useEffect(() => {
    if (!isBookingOpen || !bookingDate) return;
    let cancelled = false;
    fetchTakenSlots(bookingDate)
      .then(({ taken }) => { if (!cancelled) setTakenSlots(taken); })
      .catch(() => { if (!cancelled) setTakenSlots([]); });
    return () => { cancelled = true; };
  }, [isBookingOpen, bookingDate]);

  if (!isBookingOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];
  const currentMaster = masters.find(m => m.id === selectedMasterId) || masters[0];

  const today = localDate(new Date());
  const isSlotUnavailable = (time: string) => {
    if (takenSlots.some(s => s.masterId === currentMaster?.id && s.time === time)) return true;
    if (bookingDate !== today) return false;
    const [h, m] = time.split(':').map(Number);
    const now = new Date();
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes();
  };
  const carStepValid = carBrand.trim().length > 0 && carModel.trim().length > 0;
  const dateStepValid = bookingDate >= today && !isSlotUnavailable(bookingTime);

  // Calculate price based on category
  const finalPrice = discountedPrice(currentService, carCategory, findPromotion(promotions, activePromoCode));

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 9 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const result = await addBooking({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      carBrand: carBrand.trim(),
      carModel: carModel.trim(),
      carYear: Number(carYear) || 0,
      carCategory,
      plateNumber: plateNumber.trim(),
      serviceId: currentService.id,
      serviceTitle: currentService.titleKey,
      masterId: currentMaster.id,
      masterName: currentMaster.name,
      bookingDate,
      bookingTime,
      filmBrand: selectedFilmBrand,
      priceKgs: finalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pay_on_site' : 'paid',
      status: 'pending',
      notes,
      tintPermitAssistance
    });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.error === 'slot_taken') {
        setTakenSlots(prev => [...prev, { masterId: currentMaster.id, time: bookingTime }]);
        setSubmitError('Это время у мастера уже заняли. Выберите другое время или мастера.');
        setStep(4);
      } else {
        setSubmitError(`Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам: ${studioSettings.phone}`);
      }
      return;
    }

    setConfirmedBooking(result.booking);
    setStep(6); // Success view

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const timeSlots = ['09:00', '11:30', '14:00', '16:30', '19:00'];

  const carBrandsPopular = ['Toyota', 'Lexus', 'BMW', 'Mercedes-Benz', 'Zeekr', 'Li Auto', 'Hyundai', 'Kia', 'Porsche'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <TonixLogo size={36} />
            <div>
              <h3 className="text-sm font-extrabold text-white">{t.bookingModalTitle}</h3>
              <p className="text-[11px] text-slate-400">Шаг {step} из 5 • TONIX TINT STUDIO Бишкек</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsBookingOpen(false);
              setStep(1);
              setConfirmedBooking(null);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard progress bar */}
        {step <= 5 && (
          <div className="grid grid-cols-5 h-1 bg-slate-950">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-full transition-all ${
                  s <= step ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1: Car Selection */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              <span>{t.stepCar}</span>
            </div>

            {/* Category Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sedan', label: t.carSedan },
                { id: 'crossover', label: t.carCrossover },
                { id: 'suv', label: t.carSuv },
                { id: 'premium', label: t.carPremium }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCarCategory(cat.id as any)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    carCategory === cat.id
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Brand suggestions */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Марка авто (популярные в Бишкеке):
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {carBrandsPopular.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setCarBrand(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      carBrand === b ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={carBrand}
                onChange={e => setCarBrand(e.target.value)}
                placeholder="Или введите свою марку"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Модель авто: *
                </label>
                <input
                  type="text"
                  value={carModel}
                  onChange={e => setCarModel(e.target.value)}
                  placeholder="Например: Camry 70 / LX570 / Zeekr 001"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Год выпуска:
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1980}
                  max={new Date().getFullYear() + 1}
                  value={carYear}
                  onChange={e => setCarYear(e.target.value.slice(0, 4))}
                  placeholder="Например: 2022"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Госномер (необязательно):
                </label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={e => setPlateNumber(e.target.value)}
                  placeholder="01KG 777 AAA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              {!carStepValid && (
                <span className="text-[11px] text-slate-500">Укажите марку и модель авто</span>
              )}
              <button
                onClick={() => setStep(2)}
                disabled={!carStepValid}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{t.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Service & Material */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{t.stepService}</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {services.map(s => {
                const isSel = selectedServiceId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedServiceId(s.id);
                      if (s.filmBrands[0]) setSelectedFilmBrand(s.filmBrands[0]);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSel ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-750'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{s.titleKey}</div>
                      <div className="text-[11px] text-slate-400">{s.features[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-amber-400 text-xs">
                        {servicePrice(s, carCategory).toLocaleString()} KGS
                      </div>
                      <div className="text-[10px] text-slate-500">~{s.durationHours} ч.</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Film brand choice */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Материал / Пленка:
              </label>
              <div className="flex flex-wrap gap-2">
                {currentService.filmBrands.map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedFilmBrand(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      selectedFilmBrand === b ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.prevStep}</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Specialist */}
        {step === 3 && (
          <div className="p-6 space-y-5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{t.stepMaster}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {masters.map(m => {
                const isSel = selectedMasterId === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMasterId(m.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      isSel ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-750'
                    }`}
                  >
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="font-bold text-xs text-white">{m.name}</div>
                      <div className="text-[11px] text-amber-400">{m.role}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Рейтинг: {m.rating} ★ ({m.completedCars}+ авто)</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.prevStep}</span>
              </button>

              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Date & Time */}
        {step === 4 && (
          <div className="p-6 space-y-5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{t.stepDateTime}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.selectDate}:
              </label>
              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={e => { setBookingDate(e.target.value); setSubmitError(null); }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.selectTime}:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map(time => {
                  const unavailable = isSlotUnavailable(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={unavailable}
                      onClick={() => { setBookingTime(time); setSubmitError(null); }}
                      title={unavailable ? 'Время занято или уже прошло' : undefined}
                      className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-35 disabled:line-through ${
                        bookingTime === time && !unavailable
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              {bookingDate < today && (
                <p className="mt-2 text-[11px] text-red-400">Эта дата уже прошла — выберите сегодня или позже.</p>
              )}
              {bookingDate >= today && isSlotUnavailable(bookingTime) && (
                <p className="mt-2 text-[11px] text-amber-400">Выбранное время недоступно у мастера {currentMaster?.name} — выберите другое.</p>
              )}
              {submitError && step === 4 && (
                <p className="mt-2 text-[11px] text-red-400">{submitError}</p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Приемка авто занимает 10 минут. Вы можете ожидать в комфортной лаунж-зоне с кофе.</span>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.prevStep}</span>
              </button>

              <button
                onClick={() => { setSubmitError(null); setStep(5); }}
                disabled={!dateStepValid}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{t.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact, Kyrgyz Tint Permit Checkbox, & Payment */}
        {step === 5 && (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              <span>{t.stepPayment} & Контакты</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.clientNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Бектур / Азамат"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.clientPhoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  readOnly={Boolean(clientProfile)}
                  placeholder="+996 700 910 777"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 read-only:text-slate-400"
                />
                {clientProfile && (
                  <span className="mt-1 block text-[10px] text-slate-500">Номер из вашего личного кабинета</span>
                )}
              </div>
            </div>

            {/* Kyrgyz Tint Permit Checkbox */}
            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="tintPermit"
                checked={tintPermitAssistance}
                onChange={e => setTintPermitAssistance(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="tintPermit" className="text-xs text-slate-300 cursor-pointer">
                <span className="font-bold text-white block">{t.permitCheckboxLabel}</span>
                <span className="text-[11px] text-slate-400">Наш администратор поможет подать онлайн заявку в ГУ «Унаа» через портал Түндүк без очередей.</span>
              </label>
            </div>

            {/* Payment Systems */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Способ оплаты:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mbank', label: 'MBank QR', badge: '0% ком.' },
                  { id: 'odengi', label: 'О!Деньги', badge: 'Кэшбэк' },
                  { id: 'optima', label: 'Optima Pay', badge: 'QR' },
                  { id: 'card', label: 'Банк. карта', badge: 'Visa/Elkart' },
                  { id: 'cash', label: 'В студии', badge: 'Наличные' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === p.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div className="text-[10px] text-amber-400">{p.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Price Summary */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Итоговая стоимость:</div>
                <div className="text-lg font-black text-amber-400">
                  {finalPrice.toLocaleString()} KGS
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <div>{carBrand} {carModel}{carYear ? ` (${carYear})` : ''}</div>
                <div>{bookingDate} в {bookingTime}</div>
              </div>
            </div>

            {submitError && (
              <p className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-[11px] text-red-300">{submitError}</p>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.prevStep}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-wait"
              >
                <span>{isSubmitting ? 'Отправляем…' : t.confirmBooking}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 6: Confirmation Success & Telegram Dispatch simulation */}
        {step === 6 && confirmedBooking && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center glow-amber">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Заказ #{confirmedBooking.id}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {t.bookingSuccessTitle}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                {t.bookingSuccessDesc}
              </p>
            </div>

            {/* Booking number: used together with the phone to sign in to the client cabinet */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-left space-y-2">
              <div className="text-xs font-bold text-slate-200">Ваш номер записи</div>
              <div className="text-2xl font-black font-mono text-amber-400 tracking-wide select-all">{confirmedBooking.id}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Запись сохранена в вашем личном кабинете — там можно следить за статусом заказа с любого устройства.
              </p>
              <button
                onClick={() => {
                  setIsBookingOpen(false);
                  setStep(1);
                  setConfirmedBooking(null);
                  setIsCabinetOpen(true);
                }}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer"
              >
                Открыть личный кабинет
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsappUrl(
                  studioSettings.whatsapp,
                  `Здравствуйте! Я оформил запись ${confirmedBooking.id} на ${confirmedBooking.carBrand} ${confirmedBooking.carModel} в TONIX TINT STUDIO`
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp студии</span>
              </a>

              <button
                onClick={() => {
                  setIsBookingOpen(false);
                  setStep(1);
                  setConfirmedBooking(null);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wide"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
