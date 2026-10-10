import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_FAQS } from '../data/initialData';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  FileCheck, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { t } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 relative bg-slate-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ОТВЕТЫ НА ВОПРОСЫ И ЗАКОНОДАТЕЛЬСТВО</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Kyrgyz Tint Law Highlight Box */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-400/40 text-blue-400 shrink-0">
              <FileCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {t.tintPermitAlert}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  ГУ «Унаа» МВД КР
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.tintPermitAlertDesc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="text-amber-400">
                  ✔ Задняя полусфера — 100% бесплатно и без разрешения
                </div>
                <div className="text-blue-300">
                  ✔ Помощь в оформлении заявки на передние стекла за 10 минут
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {INITIAL_FAQS.map(faq => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-100">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-950 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
