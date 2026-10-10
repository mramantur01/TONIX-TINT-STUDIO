import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Star, 
  Award, 
  Calendar, 
  CheckCircle, 
  ShieldCheck 
} from 'lucide-react';

export const MastersSection: React.FC = () => {
  const { masters, setIsBookingOpen, openBookingWithPreselect } = useApp();

  return (
    <section className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>КОМАНДА ЭКСПЕРТОВ</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Сертифицированные мастера TONIX TINT STUDIO
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Каждый мастер прошел сертификацию на заводах STEK и LLumar, стаж работы от 7 лет. Вы можете лично выбрать мастера при записи.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map(master => (
            <div
              key={master.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Master Avatar & Badge */}
                <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-amber-500/60 transition-colors">
                  <img
                    src={master.avatarUrl}
                    alt={master.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1 right-1 bg-slate-950/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-slate-700 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{master.rating}</span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center">
                  <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors">
                    {master.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {master.role}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-800/80">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Опыт</div>
                    <div className="font-bold text-xs text-slate-200 mt-0.5">{master.experienceYears} лет</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Оклеено</div>
                    <div className="font-bold text-xs text-slate-200 mt-0.5">{master.completedCars}+ авто</div>
                  </div>
                </div>

                {/* Specialty */}
                <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  <span className="text-slate-300 font-semibold block mb-0.5">Специализация:</span>
                  {master.specialty}
                </div>
              </div>

              {/* Book with Master Button */}
              <div className="pt-5 border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl border border-slate-700 hover:border-amber-500 bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Записаться к мастеру</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
