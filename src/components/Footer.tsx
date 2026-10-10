import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Clock, 
  MessageCircle, 
  Send, 
  Calendar, 
  User, 
  Lock, 
  Sparkles,
  CreditCard,
  Instagram
} from 'lucide-react';
import { TonixLogo } from './TonixLogo';
import { getInstagramUrl, getInstagramUsername, getTelegramUrl, getWhatsappUrl } from '../utils/socialUtils';

export const Footer: React.FC = () => {
  const { t, setIsBookingOpen, setIsCabinetOpen, setIsAdminOpen, studioSettings } = useApp();

  return (
    <footer className="bg-slate-900/95 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top CTA banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-amber-400 font-extrabold uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{studioSettings.studioTagline || 'СТУДИЯ ПРЕМИАЛЬНОГО ДЕТЕЙЛИНГА В БИШКЕКЕ'}</span>
            </span>
            <h3 className="text-2xl font-black text-white">
              Защитите ваш автомобиль уже на этой неделе
            </h3>
            <p className="text-slate-400 mt-1 max-w-xl">
              Забронируйте удобное время в боксе онлайн. Консультация мастера и проверка ЛКП толщиномером — бесплатно.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Записаться в студию →
            </button>
            <a
              href={`https://wa.me/${studioSettings.whatsapp.replace(/\D/g, '')}?text=Здравствуйте!%20Хочу%20узнать%20наличие%20окон%20на%20тонировку%20в%20Бишкеке`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-600/15 text-emerald-400 hover:bg-emerald-600/25 font-bold text-xs flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp чат</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <TonixLogo size={56} showText={true} />
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Премиум студия детейлинга, антигравийной бронезащиты PPF и тонировки по ГОСТу Кыргызской Республики. Официальный сертифицированный установщик пленок STEK и LLumar в Бишкеке.
            </p>

            {/* Payment Systems Badges */}
            <div className="pt-2">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Принимаем к оплате:</div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">MBank QR</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">О!Деньги</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Optima Bank</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Visa / Elkart</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Услуги</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Тонировка задней полусферы</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Тонировка передних боковых</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Атермальная пленка (Хамелеон)</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Бронирование «Зоны риска»</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Полный кузов PPF полиуретан</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Комплекс «Антихром»</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Клиенту</h4>
            <ul className="space-y-2">
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">Онлайн калькулятор</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Галерея До и После</a></li>
              <li><a href="#promotions" className="hover:text-amber-400 transition-colors text-amber-400 font-semibold">Акции и скидки</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Отзывы клиентов</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Закон о тонировке в КР</a></li>
              <li>
                <button onClick={() => setIsCabinetOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>

          {/* Bishkek Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Контакты в Бишкеке</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{studioSettings.address}</span>
              </div>
              <div className="text-[11px] text-slate-400 pl-6">
                <span className="text-amber-400 font-semibold">Контактное лицо:</span> {studioSettings.contactPerson}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{studioSettings.workHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${studioSettings.phone.replace(/[^\d+]/g, '')}`} className="text-white hover:text-amber-400 font-bold">{studioSettings.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={getWhatsappUrl(studioSettings.whatsapp)} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{studioSettings.whatsapp} (WhatsApp)</a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={getInstagramUrl(studioSettings.instagram)} target="_blank" rel="noreferrer" className="text-pink-300 hover:text-pink-200 hover:underline font-mono">
                  {getInstagramUsername(studioSettings.instagram)} (Instagram)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={getTelegramUrl(studioSettings.telegram)} target="_blank" rel="noreferrer" className="font-mono text-cyan-300 hover:underline">
                  {studioSettings.telegram || t.telegramBot} (Telegram)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>{t.footerRights}</span>
            <span className="text-slate-800">•</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer flex items-center gap-1 opacity-50 hover:opacity-100"
              title="Служебный вход (Панель управления: Alt+A или #admin)"
            >
              <Lock className="w-3 h-3" />
              <span>Служебный вход</span>
            </button>
          </div>
          <p className="max-w-xl text-center sm:text-right">
            {t.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
