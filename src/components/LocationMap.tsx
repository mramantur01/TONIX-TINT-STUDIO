import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  PhoneCall, 
  MessageCircle, 
  Navigation, 
  Coffee, 
  Wifi, 
  Shield, 
  ExternalLink,
  Instagram,
  Send
} from 'lucide-react';
import { get2gisUrl, getInstagramUrl, getInstagramUsername, getWhatsappUrl, getTelegramUrl, getYandexMapsUrl } from '../utils/socialUtils';

export const LocationMap: React.FC = () => {
  const { t, studioSettings } = useApp();

  return (
    <section id="location" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>ЛОКАЦИЯ В БИШКЕКЕ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.locationTitle}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {t.locationSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Contact Info & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
              
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                  Адрес студии
                </div>
                <div className="text-lg font-black text-white flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{studioSettings.address}</span>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Ориентир: Ленинский район, заезд с первой линии, охраняемая закрытая парковка бокса.
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-800 pt-4">
                <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                  Контактное лицо & Шеф-мастер
                </div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{studioSettings.contactPerson}</span>
                  <a href={`tel:${studioSettings.phone.replace(/[^\d+]/g, '')}`} className="text-xs text-amber-400 font-semibold hover:underline">{studioSettings.phone}</a>
                </div>
                <p className="text-[11px] text-slate-400">
                  Личный прием, точный расчет стоимости, бронирование бокса и гарантийные сертификаты.
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-800 pt-4">
                <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                  График работы
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{studioSettings.workHours}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <Coffee className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-slate-200">Лаунж & Кофе</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <Wifi className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-slate-200">Скоростной Wi-Fi</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <Shield className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-slate-200">Охрана 24/7</div>
                </div>
              </div>

              {/* Direct Maps Links */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={get2gisUrl(studioSettings.gisLink, studioSettings.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>{t.findOn2gis}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getYandexMapsUrl(studioSettings.yandexMapsLink, studioSettings.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 text-red-400 font-bold text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>{t.findOnYandex}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${studioSettings.phone.replace(/[^\d+]/g, '')}`}
                    className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>{studioSettings.phone}</span>
                  </a>

                  <a
                    href={getWhatsappUrl(studioSettings.whatsapp, 'Здравствуйте! Подскажите, как доехать в студию TONIX TINT STUDIO?')}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Instagram Direct Link */}
                <a
                  href={getInstagramUrl(studioSettings.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-amber-600/20 border border-pink-500/40 hover:border-pink-400 text-pink-300 hover:text-white font-bold text-xs flex items-center justify-between transition-all shadow-md shadow-pink-500/10 group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white block font-extrabold leading-tight">Instagram студии:</span>
                      <span className="text-[11px] text-pink-300 font-mono">{getInstagramUsername(studioSettings.instagram)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-pink-300 group-hover:translate-x-0.5 transition-transform">
                    <span>Смотреть работы</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>

            </div>
          </div>

          {/* Right: Interactive Styled Map Visual */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl h-[420px] bg-slate-900 flex flex-col justify-between p-6 glow-cyan">
              
              {/* Map background grid pattern */}
              <div 
                className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"
              />

              {/* Simulated Map Streets Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal main artery: Zhibek-Zholu Ave */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-slate-800/80 -translate-y-1/2 border-y border-slate-700/50">
                  <span className="absolute -top-5 left-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Проспект Жибек-Жолу, 730/1
                  </span>
                </div>

                {/* Vertical main artery: Leninsky district street */}
                <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-slate-800/80 -translate-x-1/2 border-x border-slate-700/50">
                  <span className="absolute top-6 left-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Ленинский р-н (индекс 720033)
                  </span>
                </div>

                {/* Bishkek North artery marker */}
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-amber-500/20 border-t border-dashed border-amber-500/40" />

                {/* Studio Pin Marker in Bishkek */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-2xl relative z-10 glow-amber">
                      <MapPin className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                  </div>
                  <div className="mt-2 bg-slate-950/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/50 shadow-2xl text-xs font-black text-amber-400 whitespace-nowrap">
                    TONIX TINT STUDIO ★
                  </div>
                </div>
              </div>

              {/* Map Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{studioSettings.address}</span>
                </div>

                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-amber-400">
                  Открыто до 21:00
                </div>
              </div>

              {/* Map Bottom Bar */}
              <div className="relative z-10 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="font-extrabold text-white">Теплые чистые боксы на 6 машиномест</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Бесплатная закрытая клиентская парковка под шлагбаумом</div>
                </div>

                <a
                  href={get2gisUrl(studioSettings.gisLink, studioSettings.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 text-center transition-colors"
                >
                  Построить маршрут
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
