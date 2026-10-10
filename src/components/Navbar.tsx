import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  PhoneCall, 
  Bell, 
  MessageCircle,
  Globe,
  Sparkles,
  Instagram
} from 'lucide-react';
import { Language } from '../types';
import { TonixLogo } from './TonixLogo';
import { getInstagramUrl, getInstagramUsername, getWhatsappUrl } from '../utils/socialUtils';

export const Navbar: React.FC = () => {
  const { 
    t, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    setIsBookingOpen, 
    setIsCabinetOpen, 
    clientBookings,
    notifications,
    pushEnabled,
    togglePush,
    announcementText,
    studioSettings
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const activeBookingsCount = clientBookings.filter(b => b.status === 'in_progress' || b.status === 'ready').length;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'kg', label: 'Кыргызча', flag: '🇰🇬' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800/80 transition-colors dark:bg-slate-900/90 light:bg-white/95">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{announcementText}</span>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="underline hover:text-black font-bold ml-1 cursor-pointer"
        >
          Записаться →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching user's emblem */}
          <a href="#" className="flex items-center group">
            <TonixLogo size={50} showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition-colors">{t.navServices}</a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>{t.navCalculator}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">{t.navGallery}</a>
            <a href="#instagram-feed" className="hover:text-pink-400 text-pink-300 transition-colors flex items-center gap-1 font-semibold">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
            <a href="#promotions" className="hover:text-amber-400 transition-colors text-amber-400 font-semibold">{t.navPromotions}</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">{t.navReviews}</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">{t.navFaq}</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">{t.navContacts}</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:border-amber-500/40 transition-colors"
                title="Сменить язык / Switch language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-800/80 transition-colors ${
                        language === lang.code ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              title="Переключить тему оформления"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Instagram Link */}
            <a
              href={getInstagramUrl(studioSettings.instagram)}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-pink-400 hover:text-pink-300 hover:border-pink-500/40 transition-colors"
              title={`Instagram ${getInstagramUsername(studioSettings.instagram)}`}
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Уведомления и статус"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-4 z-50 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                    <span className="text-xs font-bold text-slate-200">Push-центр уведомлений</span>
                    <button 
                      onClick={togglePush}
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {pushEnabled ? 'Push: Вкл' : 'Включить Push'}
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                        <div className="font-semibold text-slate-200">{n.title}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{n.body}</div>
                        <div className="text-[10px] text-amber-400/80 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Personal Cabinet Button */}
            <button
              onClick={() => setIsCabinetOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200 hover:border-amber-500/40 hover:text-amber-400 text-xs font-semibold transition-all"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>{t.myCabinet}</span>
              {activeBookingsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Main Book Online CTA */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookOnlineBtn}</span>
            </button>
          </div>

          {/* Mobile hamburger & quick actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Запись</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-5 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4">
          <nav className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-300">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400"
            >
              {t.navServices}
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400 text-amber-400 font-semibold"
            >
              {t.navCalculator} 🔥
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400"
            >
              {t.navGallery}
            </a>
            <a 
              href="#instagram-feed" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-300 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-1.5 font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram @tonix.kg</span>
            </a>
            <a 
              href="#promotions" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400"
            >
              {t.navPromotions}
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400"
            >
              {t.navReviews}
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400"
            >
              {t.navFaq}
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 hover:text-amber-400 col-span-2 text-center"
            >
              {t.navContacts}
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    language === l.code ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-slate-900 text-slate-300 flex items-center gap-1.5 text-xs"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Светлая' : 'Тёмная'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCabinetOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-200 hover:border-amber-500/40 hover:text-amber-400 transition-colors shadow-sm"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>{t.myCabinet}</span>
              {activeBookingsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  {activeBookingsCount}
                </span>
              )}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-850">
            <a href={`tel:${studioSettings.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <PhoneCall className="w-4 h-4" />
              <span>{studioSettings.phone}</span>
            </a>
            <a 
              href={getWhatsappUrl(studioSettings.whatsapp, 'Здравствуйте! Хочу узнать цену на тонировку в Бишкеке')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a 
              href={getInstagramUrl(studioSettings.instagram)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 font-semibold"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
