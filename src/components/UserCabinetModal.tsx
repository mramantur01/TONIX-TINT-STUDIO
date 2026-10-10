import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Car,
  Clock,
  Download,
  FileText,
  LogOut,
  RefreshCw,
  Loader2,
  KeyRound,
  CalendarPlus,
  Plus,
} from 'lucide-react';
import { Booking } from '../types';
import { TonixLogo } from './TonixLogo';

const AUTH_ERRORS: Record<string, string> = {
  wrong_credentials: 'Неверный телефон или пароль.',
  already_registered: 'Этот номер уже зарегистрирован. Войдите с паролем.',
  booking_required:
    'На этот номер уже есть записи. Чтобы подтвердить, что номер ваш, укажите номер любой вашей записи (BK-…).',
  booking_mismatch: 'Номер записи не подходит к этому телефону.',
  weak_password: 'Пароль должен быть не короче 6 символов.',
  password_mismatch: 'Пароли не совпадают.',
  error: 'Не удалось связаться с сервером. Попробуйте ещё раз или позвоните нам.',
};

export const UserCabinetModal: React.FC = () => {
  const {
    t,
    isCabinetOpen,
    setIsCabinetOpen,
    setIsBookingOpen,
    services,
    studioSettings,
    clientBookings,
    clientProfile,
    isClientLoggedIn,
    isClientLoading,
    clientLogin,
    clientRegister,
    clientClaimBooking,
    clientLogout,
    refreshClientBookings,
    addNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'garage'>('orders');
  const [selectedBookingForWarranty, setSelectedBookingForWarranty] = useState<Booking | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [password2Input, setPassword2Input] = useState('');
  const [bookingIdInput, setBookingIdInput] = useState('');
  const [needBookingId, setNeedBookingId] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [claimInput, setClaimInput] = useState('');
  const [claimMessage, setClaimMessage] = useState<string | null>(null);

  const sortedBookings = useMemo(
    () => [...clientBookings].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')),
    [clientBookings]
  );

  // Garage: unique cars from the client's own bookings, with the work done on each.
  const garage = useMemo(() => {
    const cars = new Map<string, { title: string; year: number; works: Booking[] }>();
    for (const b of sortedBookings) {
      if (b.status === 'cancelled') continue;
      const key = `${b.carBrand} ${b.carModel}`.trim().toLowerCase();
      if (!key) continue;
      const entry = cars.get(key) || { title: `${b.carBrand} ${b.carModel}`.trim(), year: b.carYear, works: [] };
      entry.works.push(b);
      cars.set(key, entry);
    }
    return [...cars.values()];
  }, [sortedBookings]);

  if (!isCabinetOpen) return null;

  const close = () => {
    setIsCabinetOpen(false);
    setLoginError(null);
  };

  const warrantyYearsFor = (b: Booking) => services.find((s) => s.id === b.serviceId)?.warrantyYears;

  const resetAuthForm = () => {
    setPasswordInput('');
    setPassword2Input('');
    setLoginError(null);
  };

  const submitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClientLoading) return;
    setLoginError(null);
    if (authMode === 'login') {
      const result = await clientLogin(phoneInput.trim(), passwordInput);
      if (result === 'ok') resetAuthForm();
      else setLoginError(AUTH_ERRORS[result] || AUTH_ERRORS.error);
      return;
    }
    if (passwordInput !== password2Input) {
      setLoginError(AUTH_ERRORS.password_mismatch);
      return;
    }
    const result = await clientRegister({
      name: nameInput.trim(),
      phone: phoneInput.trim(),
      password: passwordInput,
      bookingId: bookingIdInput.trim() || undefined,
    });
    if (result === 'ok') {
      resetAuthForm();
      setBookingIdInput('');
      setNeedBookingId(false);
      addNotification('Регистрация завершена', 'Теперь вы можете входить по телефону и паролю.', 'success');
      return;
    }
    if (result === 'booking_required' || result === 'booking_mismatch') setNeedBookingId(true);
    if (result === 'already_registered') setAuthMode('login');
    setLoginError(AUTH_ERRORS[result] || AUTH_ERRORS.error);
  };

  const submitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimInput.trim()) return;
    setClaimMessage(null);
    const result = await clientClaimBooking(claimInput.trim());
    if (result === 'ok') {
      setClaimInput('');
      setClaimMessage('Запись добавлена в ваш кабинет.');
    } else {
      setClaimMessage(
        result === 'not_found'
          ? 'Запись не найдена. Добавить можно только запись, оформленную на ваш номер телефона.'
          : AUTH_ERRORS.error
      );
    }
  };

  const exportCsv = () => {
    const headers = 'ID,Дата,Автомобиль,Услуга,Мастер,Сумма KGS,Статус\n';
    const rows = sortedBookings
      .map(
        (b) =>
          `"${b.id}","${b.bookingDate}","${b.carBrand} ${b.carModel}","${b.serviceTitle}","${b.masterName}",${b.priceKgs},"${b.status}"`
      )
      .join('\n');
    const blob = new Blob(['﻿' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TonixTint_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addNotification('Экспорт выполнен', 'Файл заказов в формате CSV скачан.', 'success');
  };

  const printWarrantyPdf = (booking: Booking) => {
    setSelectedBookingForWarranty(booking);
    setTimeout(() => window.print(), 300);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">В работе</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">Готов к выдаче</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">Завершён</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">Отменён</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">Ожидает визита</span>;
    }
  };

  // ---------- Sign-in / registration screen ----------
  if (!isClientLoggedIn) {
    const isRegister = authMode === 'register';
    const canSubmit = isRegister
      ? nameInput.trim() && phoneInput.trim() && passwordInput && password2Input && (!needBookingId || bookingIdInput.trim())
      : phoneInput.trim() && passwordInput;
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <form
          onSubmit={submitAuth}
          className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-4 my-auto"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{t.cabinetTitle}</h3>
              <p className="text-xs text-slate-400">{isRegister ? 'Регистрация по номеру телефона' : 'Вход по телефону и паролю'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
            {(['login', 'register'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setAuthMode(mode);
                  setLoginError(null);
                }}
                className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                  authMode === mode ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'login' ? 'Вход' : 'Регистрация'}
              </button>
            ))}
          </div>

          {isRegister && (
            <label className="block">
              <span className="text-xs font-semibold text-slate-300">Имя</span>
              <input
                type="text"
                autoComplete="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </label>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-slate-300">Номер телефона</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+996 555 123 456"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-slate-300">Пароль{isRegister ? ' (не короче 6 символов)' : ''}</span>
            <input
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </label>

          {isRegister && (
            <label className="block">
              <span className="text-xs font-semibold text-slate-300">Повторите пароль</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password2Input}
                onChange={(e) => setPassword2Input(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </label>
          )}

          {isRegister && needBookingId && (
            <label className="block">
              <span className="text-xs font-semibold text-slate-300">Номер вашей записи</span>
              <input
                type="text"
                placeholder="BK-..."
                autoCapitalize="characters"
                value={bookingIdInput}
                onChange={(e) => setBookingIdInput(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </label>
          )}

          {loginError && <p className="text-xs text-red-400 leading-relaxed">{loginError}</p>}

          <button
            type="submit"
            disabled={!canSubmit || isClientLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-extrabold cursor-pointer disabled:cursor-not-allowed"
          >
            {isClientLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>

          {!isRegister && (
            <p className="text-[11px] text-slate-500 text-center">
              Забыли пароль? Позвоните нам: {studioSettings.phone}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              close();
              setIsBookingOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-amber-400" />
            Записаться без регистрации
          </button>
        </form>
      </div>
    );
  }

  // ---------- Cabinet ----------
  const clientName = clientProfile?.name || sortedBookings[0]?.clientName || 'Клиент';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto print:hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{clientName}</h3>
              <p className="text-xs text-slate-400">{clientProfile?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshClientBookings()}
              disabled={isClientLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer disabled:opacity-60"
              title="Обновить статусы"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isClientLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Обновить</span>
            </button>
            <button
              onClick={clientLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-xs font-bold text-slate-200 cursor-pointer"
              title="Выйти из кабинета"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
            <button
              onClick={close}
              aria-label="Закрыть"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'orders', label: t.cabinetOrders, icon: Clock },
            { id: 'garage', label: t.cabinetGarage, icon: Car },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'orders' | 'garage')}
                className={`py-3.5 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isSel ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Мои записи ({sortedBookings.length}):</span>
              {sortedBookings.length > 0 && (
                <button
                  onClick={exportCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.exportCsv}</span>
                </button>
              )}
            </div>

            {sortedBookings.length === 0 && (
              <p className="text-sm text-slate-400">{isClientLoading ? 'Загружаем ваши записи…' : 'Записей пока нет.'}</p>
            )}

            <form onSubmit={submitClaim} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400">
                Записывались без входа? Добавьте запись по её номеру:
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="BK-..."
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  className="flex-1 min-w-0 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!claimInput.trim()}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  Добавить
                </button>
              </div>
              {claimMessage && <p className="text-[11px] text-slate-300">{claimMessage}</p>}
            </form>

            <div className="space-y-3">
              {sortedBookings.map((b) => {
                const warranty = warrantyYearsFor(b);
                return (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-white">
                            {b.carBrand} {b.carModel}{b.carYear ? ` (${b.carYear})` : ''}
                          </span>
                          <span className="text-xs font-mono text-slate-400">#{b.id}</span>
                        </div>
                        <div className="text-xs text-amber-400 font-semibold mt-0.5">{b.serviceTitle}</div>
                      </div>
                      {getStatusBadge(b.status)}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-slate-800 text-slate-400">
                      <div>
                        <span className="block text-slate-500">Дата и время:</span>
                        <span className="text-slate-200 font-medium">{b.bookingDate} {b.bookingTime}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500">Мастер:</span>
                        <span className="text-slate-200 font-medium">{b.masterName || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500">Материал:</span>
                        <span className="text-slate-200 font-medium truncate">{b.filmBrand || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500">Стоимость:</span>
                        <span className="text-amber-400 font-black">{b.priceKgs.toLocaleString('ru-RU')} KGS</span>
                      </div>
                    </div>

                    {b.status === 'completed' && (
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-emerald-400">
                          {warranty ? `Гарантия ${warranty} лет` : 'Гарантия по условиям услуги'}
                        </span>
                        <button
                          onClick={() => printWarrantyPdf(b)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>{t.exportPdf}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Garage */}
        {activeTab === 'garage' && (
          <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
            <div className="text-xs font-bold text-slate-300">Мои автомобили:</div>
            {garage.length === 0 && <p className="text-sm text-slate-400">Автомобили появятся здесь после записи.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {garage.map((car) => (
                <div key={car.title} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white">{car.title}</span>
                    {car.year ? <span className="text-[11px] text-slate-400">{car.year}</span> : null}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {car.works.map((w) => (
                      <li key={w.id} className="flex justify-between gap-2">
                        <span>{w.serviceTitle}</span>
                        <span className="text-slate-500 shrink-0">{w.bookingDate}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Printable warranty certificate */}
      {selectedBookingForWarranty && (
        <div className="hidden print:block fixed inset-0 p-10 bg-white text-black font-sans">
          <div className="flex items-center gap-4 mb-4">
            <TonixLogo size={64} />
            <div>
              <h1 className="text-2xl font-bold">TONIX TINT STUDIO — ГАРАНТИЙНЫЙ СЕРТИФИКАТ</h1>
            </div>
          </div>
          <hr className="my-4" />
          <div className="space-y-2 text-sm">
            <p><strong>Номер заказа:</strong> #{selectedBookingForWarranty.id}</p>
            <p><strong>Клиент:</strong> {selectedBookingForWarranty.clientName}</p>
            <p><strong>Автомобиль:</strong> {selectedBookingForWarranty.carBrand} {selectedBookingForWarranty.carModel}</p>
            <p><strong>Услуга:</strong> {selectedBookingForWarranty.serviceTitle}</p>
            <p><strong>Материал:</strong> {selectedBookingForWarranty.filmBrand || '—'}</p>
            <p><strong>Мастер:</strong> {selectedBookingForWarranty.masterName || '—'}</p>
            <p><strong>Дата установки:</strong> {selectedBookingForWarranty.bookingDate}</p>
            <p>
              <strong>Гарантийный срок:</strong>{' '}
              {warrantyYearsFor(selectedBookingForWarranty)
                ? `${warrantyYearsFor(selectedBookingForWarranty)} лет с даты установки`
                : 'по условиям услуги'}
            </p>
            <p><strong>Сумма:</strong> {selectedBookingForWarranty.priceKgs.toLocaleString('ru-RU')} KGS</p>
          </div>
          <p className="mt-8 text-xs text-gray-600">
            {studioSettings.address} • Тел: {studioSettings.phone}
          </p>
        </div>
      )}
    </div>
  );
};
