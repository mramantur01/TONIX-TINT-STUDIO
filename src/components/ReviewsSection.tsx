import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  ThumbsUp, 
  PlusCircle, 
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { reviewStats, reviewsCountLabel } from '../utils/reviewStats';

export const ReviewsSection: React.FC = () => {
  const {
    t,
    language,
    reviews,
    masters,
    addReview,
    isClientLoggedIn,
    isAdminAuthed,
    clientProfile,
    setIsCabinetOpen,
    addNotification
  } = useApp();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const stats = reviewStats(reviews);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [serviceName, setServiceName] = useState('Бронирование «Зоны риска» STEK');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [masterName, setMasterName] = useState(masters[0]?.name || '');

  // Reviews come from studio clients: visitors sign in to the cabinet first.
  const openWriteModal = () => {
    if (!isClientLoggedIn && !isAdminAuthed) {
      addNotification('Войдите в кабинет', 'Отзывы оставляют клиенты студии из личного кабинета.', 'info');
      setIsCabinetOpen(true);
      return;
    }
    if (!authorName && clientProfile) setAuthorName(clientProfile.name);
    if (!masterName && masters[0]) setMasterName(masters[0].name);
    setIsWriteModalOpen(true);
  };

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !carModel.trim()) return;

    addReview({
      authorName: authorName.trim(),
      carModel: carModel.trim(),
      serviceName,
      rating,
      comment: comment.trim(),
      masterName
    });

    setIsWriteModalOpen(false);
    setAuthorName('');
    setCarModel('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>ОТЗЫВЫ АВТОЛЮБИТЕЛЕЙ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.reviewsTitle}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="text-3xl font-black text-amber-400">{stats.average}</div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{reviewsCountLabel(language, stats.count)}</div>
              </div>
            </div>

            <button
              onClick={openWriteModal}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.writeReviewBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer ${
              filterRating === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            Все отзывы ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1 ${
              filterRating === 5
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            <span>5 звезд</span>
            <Star className="w-3 h-3 fill-current" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(r => (
            <div
              key={r.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>{r.authorName}</span>
                      {r.verified && (
                        <span title={t.verifiedClient}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-amber-400 font-medium mt-0.5">
                      {r.carModel}
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 inline-block">
                  Услуга: {r.serviceName}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>{r.date}</span>
                {r.masterName && (
                  <span className="text-slate-400">Мастер: {r.masterName}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>ОЦЕНКА КАЧЕСТВА РАБОТЫ</span>
            </div>
            <h3 className="text-2xl font-black text-white">Оставить отзыв</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Поделитесь вашим опытом обслуживания авто в TONIX TINT STUDIO Bishkek.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ваше имя:
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="Например: Улан А."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Марка и модель авто:
                  </label>
                  <input
                    type="text"
                    required
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    placeholder="Lexus LX570 / BMW X5"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Мастер:
                  </label>
                  <select
                    value={masterName}
                    onChange={e => setMasterName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {masters.map(m => (
                      <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Оценка (звезды):
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        rating >= star
                          ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                          : 'border-slate-800 bg-slate-950 text-slate-600'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ваш отзыв:
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Опишите, как прошла оклейка/тонировка, довольны ли качеством..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Опубликовать отзыв</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
