import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { t, services, openBookingWithPreselect } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'tinting' | 'ppf' | 'vinyl' | 'detailing'>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);

  const filterTabs = [
    { key: 'all', label: t.allCategories },
    { key: 'tinting', label: t.catTinting },
    { key: 'ppf', label: t.catPpf },
    { key: 'vinyl', label: t.catVinyl },
    { key: 'detailing', label: t.catDetailing }
  ];

  const filteredServices = services.filter(s => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  return (
    <section id="services" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>УСЛУГИ ВЫСШЕГО КЛАССА</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.servicesTitle}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {t.servicesSubtitle}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-750 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800/90 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-xl"
            >
              {/* Image banner with badges */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.titleKey}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {service.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Flame className="w-3 h-3" />
                    <span>Популярно</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{service.warrantyYears} {t.warrantyYearsText}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-slate-200 font-semibold border border-slate-700/60 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>~{service.durationHours} {t.durationText}</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.titleKey}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {service.descriptionKey}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Film Brands */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Материалы:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.filmBrands.map((b, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-300 border border-slate-800">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">{t.fromPrice}</span>
                    <div className="text-xl font-black text-amber-400">
                      {service.priceSedan.toLocaleString()} <span className="text-xs font-semibold text-slate-300">KGS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingWithPreselect(service.id, 'crossover')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <span>{t.selectService}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
