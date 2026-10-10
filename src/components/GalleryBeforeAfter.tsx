import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GALLERY_ITEMS } from '../data/initialData';
import { 
  Sliders, 
  Sparkles, 
  Layers, 
  Clock, 
  ShieldCheck,
  Maximize2,
  X
} from 'lucide-react';

export const GalleryBeforeAfter: React.FC = () => {
  const { t, portfolioItems } = useApp();
  const items = portfolioItems && portfolioItems.length > 0 ? portfolioItems : GALLERY_ITEMS;
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'ppf' | 'tinting' | 'vinyl'>('all');
  const [selectedModalImage, setSelectedModalImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const filteredItems = items.filter(item => {
    if (activeGalleryTab === 'all') return true;
    return item.category === activeGalleryTab;
  });

  const featured = items[0] || GALLERY_ITEMS[0]; // Featured comparison slider

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>ПОРТФОЛИО СТУДИИ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.galleryTitle}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Interactive Before / After Slider Component */}
        <div className="mb-16">
          <div className="text-center text-xs font-semibold text-slate-400 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.beforeAfterNotice}</span>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-80 sm:h-[480px] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl select-none cursor-ew-resize glow-amber"
          >
            {/* After Image (Full background) */}
            <img
              src={featured.afterImage}
              alt="После работы TONIX TINT STUDIO"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* After Label */}
            <div className="absolute top-5 right-5 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-lg z-10 uppercase tracking-wider">
              {t.afterText}
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={featured.beforeImage}
                alt="До работы"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
              />
              
              {/* Before Label */}
              <div className="absolute top-5 left-5 bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 uppercase tracking-wider">
                {t.beforeText}
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-xl">
                <Sliders className="w-4 h-4 text-amber-400 rotate-90" />
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800/80 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white">{featured.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{featured.description}</div>
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0 text-amber-400 font-bold">
                <span>{featured.film}</span>
                <span>•</span>
                <span className="text-slate-300">{featured.timeSpent}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Cards Grid with Category Filter */}
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'all', label: 'Все работы' },
              { id: 'ppf', label: 'PPF Бронепленка' },
              { id: 'tinting', label: 'Тонирование' },
              { id: 'vinyl', label: 'Винил стайлинг' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveGalleryTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeGalleryTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedModalImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all shadow-lg hover:-translate-y-1"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 text-slate-300 group-hover:text-amber-400 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    {item.film}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{item.car}</span>
                    <span>{item.timeSpent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal zoomed image */}
        {selectedModalImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <button
                onClick={() => setSelectedModalImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:text-amber-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-96 sm:h-[480px]">
                <img
                  src={selectedModalImage.afterImage}
                  alt={selectedModalImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800">
                <h3 className="text-xl font-bold text-white">{selectedModalImage.title}</h3>
                <p className="text-xs text-slate-300 mt-2">{selectedModalImage.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-400 mt-4">
                  <span>Пленка: {selectedModalImage.film}</span>
                  <span>•</span>
                  <span>Время работы: {selectedModalImage.timeSpent}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
