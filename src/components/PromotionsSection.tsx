import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Tag, 
  Copy, 
  Check, 
  ArrowRight, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export const PromotionsSection: React.FC = () => {
  const { t, promotions, setActivePromoCode, setIsBookingOpen } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { ...prev, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const applyAndBook = (code: string) => {
    setActivePromoCode(code);
    setIsBookingOpen(true);
  };

  return (
    <section id="promotions" className="py-20 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>ОГРАНИЧЕННЫЕ ПРЕДЛОЖЕНИЯ</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.promotionsTitle}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              {t.promotionsSubtitle}
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg glow-amber">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Clock className="w-4 h-4 animate-spin" />
              <span>До конца акции:</span>
            </div>
            <div className="flex items-center gap-2 text-white font-mono font-black text-sm">
              <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-center">
                <span>{timeLeft.days}д</span>
              </div>
              <span>:</span>
              <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-center">
                <span>{String(timeLeft.hours).padStart(2, '0')}ч</span>
              </div>
              <span>:</span>
              <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-center">
                <span>{String(timeLeft.minutes).padStart(2, '0')}м</span>
              </div>
              <span>:</span>
              <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-center text-amber-400">
                <span>{String(timeLeft.seconds).padStart(2, '0')}с</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map(promo => (
            <div
              key={promo.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden group"
            >
              {/* Decorative accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${promo.accentColor}`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950 text-amber-400 border border-amber-500/30">
                    {promo.badge}
                  </span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    -{promo.discountPercent}%
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {promo.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {promo.description}
                </p>

                {/* Promo code copy box */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Промокод</div>
                      <div className="text-xs font-mono font-black text-amber-400 tracking-wider">
                        {promo.code}
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(promo.code)}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="Скопировать промокод"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-bold">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">{t.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span>{t.validUntil}:</span>
                  <span className="text-slate-400 font-medium">{promo.validUntil}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => applyAndBook(promo.code)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>{t.applyPromo}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
