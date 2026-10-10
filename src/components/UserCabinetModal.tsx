import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  Car, 
  Clock, 
  ShieldCheck, 
  Download, 
  FileText, 
  Key, 
  Smartphone, 
  Gift, 
  CheckCircle2, 
  AlertCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Booking } from '../types';
import { TonixLogo } from './TonixLogo';

export const UserCabinetModal: React.FC = () => {
  const { 
    t, 
    isCabinetOpen, 
    setIsCabinetOpen, 
    bookings, 
    twoFactorEnabled, 
    setTwoFactorEnabled, 
    securityLogs,
    addNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'garage' | 'security' | 'loyalty'>('orders');
  const [selectedBookingForWarranty, setSelectedBookingForWarranty] = useState<Booking | null>(null);

  if (!isCabinetOpen) return null;

  // Filter client bookings
  const clientBookings = bookings;

  const exportCsv = () => {
    const headers = 'ID,Дата,Автомобиль,Услуга,Мастер,Сумма KGS,Статус\n';
    const rows = clientBookings.map(b => 
      `"${b.id}","${b.bookingDate}","${b.carBrand} ${b.carModel}","${b.serviceTitle}","${b.masterName}",${b.priceKgs},"${b.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TonixTint_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    addNotification('Экспорт выполнен', 'Файл заказов в формате CSV успешно скачан.', 'success');
  };

  const printWarrantyPdf = (booking: Booking) => {
    setSelectedBookingForWarranty(booking);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">В работе в боксе</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">Готов к выдаче</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">Завершен</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">Ожидает визита</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Бексултан Маратов</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  GOLD VIP
                </span>
              </div>
              <p className="text-xs text-slate-400">+996 550 443 322 • Бишкек</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
              <div className="text-[10px] text-slate-400">Бонусный счет</div>
              <div className="text-xs font-black text-amber-400">4 200 KGS</div>
            </div>

            <button
              onClick={() => setIsCabinetOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'orders', label: t.cabinetOrders, icon: Clock },
            { id: 'garage', label: t.cabinetGarage, icon: Car },
            { id: 'security', label: t.cabinetSecurity, icon: ShieldCheck },
            { id: 'loyalty', label: t.cabinetBonus, icon: Gift }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                История обслуживаний ({clientBookings.length}):
              </span>
              <button
                onClick={exportCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.exportCsv}</span>
              </button>
            </div>

            <div className="space-y-3">
              {clientBookings.map(b => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">{b.carBrand} {b.carModel} ({b.carYear})</span>
                        <span className="text-xs font-mono text-slate-400">#{b.id}</span>
                      </div>
                      <div className="text-xs text-amber-400 font-semibold mt-0.5">
                        {b.serviceTitle}
                      </div>
                    </div>
                    {getStatusBadge(b.status)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-slate-850 text-slate-400">
                    <div>
                      <span className="block text-slate-500">Дата и время:</span>
                      <span className="text-slate-200 font-medium">{b.bookingDate} {b.bookingTime}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Мастер:</span>
                      <span className="text-slate-200 font-medium">{b.masterName}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Материал:</span>
                      <span className="text-slate-200 font-medium truncate">{b.filmBrand}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Стоимость:</span>
                      <span className="text-amber-400 font-black">{b.priceKgs.toLocaleString()} KGS</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => printWarrantyPdf(b)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.exportPdf}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Garage */}
        {activeTab === 'garage' && (
          <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
            <div className="text-xs font-bold text-slate-300 mb-2">
              Сохраненные автомобили в личном гараже:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-white">Lexus LX 600</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 font-mono text-amber-400">
                    01KG 777 AAA
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Установлено: STEK DYNOshield (Зоны риска), Llumar ATR 5%.
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Гарантия активна до 2036 г.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-white">Toyota Camry 70</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 font-mono text-slate-400">
                    01KG 123 BBB
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Установлено: Атермалка Llumar AIR 80, Антихром.
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Гарантия активна до 2031 г.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Security & 2FA */}
        {activeTab === 'security' && (
          <div className="p-6 space-y-5 max-h-[480px] overflow-y-auto">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>{t.twoFactorAuth}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {t.twoFactorDesc}
                </p>
              </div>

              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  twoFactorEnabled ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Security Logs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300">
                {t.securityLogs}:
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {securityLogs.map(l => (
                  <div key={l.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between text-slate-400">
                    <div>
                      <span className="text-amber-400">{l.timestamp}</span> • <span>{l.event}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{l.ip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Loyalty & Cashback */}
        {activeTab === 'loyalty' && (
          <div className="p-6 space-y-5 max-h-[480px] overflow-y-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-amber-400">Клубная карта TONIX TINT</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white">
                4 200 <span className="text-amber-400 text-lg">СОМ</span>
              </div>
              <p className="text-xs text-slate-300">
                Вы получаете 5% кэшбэка со всех услуг оклейки и детейлинга. Бонусами можно оплатить до 30% стоимости любого следующего заказа.
              </p>
            </div>
          </div>
        )}

        {/* Printable Hidden Element for PDF Warranty */}
        {selectedBookingForWarranty && (
          <div className="hidden print:block p-10 bg-white text-black font-sans">
            <div className="flex items-center gap-4 mb-4">
              <TonixLogo size={64} />
              <div>
                <h1 className="text-2xl font-bold">TONIX TINT STUDIO — ГАРАНТИЙНЫЙ СЕРТИФИКАТ</h1>
                <p className="text-sm mt-0.5 text-gray-700">Официальный центр сертифицированной оклейки (LLumar & STEK)</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <p><strong>Номер заказа:</strong> #{selectedBookingForWarranty.id}</p>
              <p><strong>Автомобиль:</strong> {selectedBookingForWarranty.carBrand} {selectedBookingForWarranty.carModel}</p>
              <p><strong>Услуга:</strong> {selectedBookingForWarranty.serviceTitle}</p>
              <p><strong>Материал:</strong> {selectedBookingForWarranty.filmBrand}</p>
              <p><strong>Мастер:</strong> {selectedBookingForWarranty.masterName}</p>
              <p><strong>Дата установки:</strong> {selectedBookingForWarranty.bookingDate}</p>
              <p><strong>Гарантийный срок:</strong> 10 лет с даты оклейки</p>
              <p><strong>Сумма:</strong> {selectedBookingForWarranty.priceKgs} KGS</p>
            </div>
            <p className="mt-8 text-xs text-gray-600">Адрес: Проспект Жибек-Жолу, 730/1, Ленинский район, г. Бишкек, 720033 • Тел: +996 700 910 777</p>
          </div>
        )}

      </div>
    </div>
  );
};
