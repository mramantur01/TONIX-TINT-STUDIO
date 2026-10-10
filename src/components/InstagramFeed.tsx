import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  RefreshCw, 
  Play, 
  Layers, 
  CheckCircle2, 
  Share2, 
  Calendar, 
  Eye, 
  Sparkles, 
  Filter, 
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstagramPost } from '../types';
import { getInstagramUrl, getInstagramUsername } from '../utils/socialUtils';

interface StoryItem {
  id: string;
  title: string;
  coverImage: string;
  category: string;
  description: string;
}

const STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: 'Работы дня',
    coverImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    category: 'tinting',
    description: 'Сегодня в боксах: BMW M5 на полной атермальной тонировке LLumar AIR 80 и Mercedes G63 на бронировании кузова.'
  },
  {
    id: 'story-2',
    title: 'Reels видео',
    coverImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80',
    category: 'reels',
    description: 'Свежий процесс поклейки полиуретана на Zeekr 001. Без пузырей и пыли в чистом боксе.'
  },
  {
    id: 'story-3',
    title: 'PPF броня',
    coverImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80',
    category: 'ppf',
    description: 'Испытание антигравийной пленки STEK DYNOshield гравием и ключами. 100% защита ЛКП.'
  },
  {
    id: 'story-4',
    title: 'Пленки США',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
    category: 'tinting',
    description: 'Оригинальные рулоны LLumar ATR и SunTek с заводскими голограммами и гарантией.'
  },
  {
    id: 'story-5',
    title: 'До / После',
    coverImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80',
    category: 'before_after',
    description: 'Фары Toyota LC 300 до полировки и после нанесения защитной полиуретановой брони.'
  },
  {
    id: 'story-6',
    title: 'Наши боксы',
    coverImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
    category: 'tinting',
    description: 'Проспект Жибек-Жолу 730/1: чистота, профессиональный свет и комфортная зона ожидания.'
  }
];

export const InstagramFeed: React.FC = () => {
  const { 
    studioSettings, 
    instagramPosts, 
    syncInstagramFeed, 
    likeInstagramPost, 
    isSyncingInstagram, 
    lastInstagramSyncTime,
    instagramSyncStatus,
    setIsBookingOpen,
    openBookingWithPreselect
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'tinting' | 'ppf' | 'reels' | 'before_after'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [userLikedPosts, setUserLikedPosts] = useState<Record<string, boolean>>({});

  const targetInstagramUrl = getInstagramUrl(studioSettings.instagram);
  const instagramHandle = getInstagramUsername(studioSettings.instagram);

  // Auto-sync on component mount
  useEffect(() => {
    // Attempt automatic sync once if not already syncing
    const timer = setTimeout(() => {
      syncInstagramFeed();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = activeFilter === 'all' 
    ? instagramPosts 
    : instagramPosts.filter(p => p.category === activeFilter);

  const handleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (userLikedPosts[postId]) return;
    setUserLikedPosts(prev => ({ ...prev, [postId]: true }));
    likeInstagramPost(postId);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="instagram-feed" className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/60 border-y border-slate-800/80">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Profile Header Card */}
        <div className="bg-slate-850/90 border border-slate-750 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl relative mb-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left: Avatar & Bio */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              
              {/* Profile Avatar with Instagram Gradient Ring */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-slate-950 p-1 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80" 
                      alt="Tonix Tint Bishkek Avatar" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-slate-900 shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    {instagramHandle}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-medium border border-pink-500/30">
                      Официальный профиль
                    </span>
                  </h3>
                  
                  {/* Public API Live status badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-400 font-medium">
                    <span className={`w-2 h-2 rounded-full ${isSyncingInstagram ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                    <span>{isSyncingInstagram ? 'Синхронизация API...' : 'Live API: Подключено'}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                  {studioSettings.studioTagline} • Премиальные материалы LLumar, SunTek, STEK. г. Бишкек.
                </p>

                {/* Stats Counter */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">480+</span>
                    <span className="text-slate-400">публикаций</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">15.4K</span>
                    <span className="text-slate-400">подписчиков</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-amber-400">4.9 ★</span>
                    <span className="text-slate-400">рейтинг студии</span>
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:inline-block">
                    Обновлено: <span className="text-slate-300 font-mono">{lastInstagramSyncTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              
              {/* Refresh Feed Button */}
              <button
                onClick={() => syncInstagramFeed()}
                disabled={isSyncingInstagram}
                title="Подтянуть свежие посты через публичный API"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all disabled:opacity-60 cursor-pointer shadow-sm flex-1 sm:flex-initial"
              >
                <RefreshCw className={`w-4 h-4 text-amber-400 ${isSyncingInstagram ? 'animate-spin' : ''}`} />
                <span>{isSyncingInstagram ? 'Обновляем...' : 'Обновить ленту'}</span>
              </button>

              {/* Direct Instagram Follow Button */}
              <a
                href={targetInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-200 flex-1 sm:flex-initial cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Подписаться @tonix.kg</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

            </div>

          </div>

          {/* Stories Bar (Visual Highlights) */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Актуальные Stories из профиля
              </span>
              <span className="text-[11px] text-slate-400">Нажмите для просмотра</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
              {STORIES.map(story => (
                <button
                  key={story.id}
                  onClick={() => setActiveStory(story)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-slate-900 p-0.5 overflow-hidden">
                      <img 
                        src={story.coverImage} 
                        alt={story.title} 
                        className="w-full h-full object-cover rounded-full group-hover:brightness-110 transition-all"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 group-hover:text-amber-400 transition-colors whitespace-nowrap">
                    {story.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>Лента Instagram • @tonix.kg</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Свежие посты и прямые включения из боксов
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Реальные автомобили клиентов, процессы тонирования и нанесения антигравийных пленок в Бишкеке
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-850 border border-slate-750 rounded-2xl shrink-0">
            {[
              { key: 'all', label: 'Все посты' },
              { key: 'tinting', label: 'Тонировка' },
              { key: 'ppf', label: 'Бронепленка' },
              { key: 'reels', label: 'Reels / Видео' },
              { key: 'before_after', label: 'До и После' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-gradient-to-r from-pink-600 to-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative bg-slate-850 rounded-2xl overflow-hidden border border-slate-750 hover:border-pink-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 flex flex-col cursor-pointer"
            >
              {/* Media Container */}
              <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
                <img 
                  src={post.mediaUrl} 
                  alt={post.caption} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge for Type (Reel/Video/Carousel) */}
                <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/10">
                  {post.type === 'video' && (
                    <>
                      <Play className="w-3 h-3 fill-white" />
                      <span>Reels</span>
                    </>
                  )}
                  {post.type === 'carousel' && (
                    <>
                      <Layers className="w-3 h-3" />
                      <span>Карусель</span>
                    </>
                  )}
                  {post.type === 'image' && (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Фото</span>
                    </>
                  )}
                </div>

                {/* Hover Overlay with Instagram Interaction */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  
                  <div className="flex items-center justify-between text-white mb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <MessageCircle className="w-4 h-4 fill-white" />
                        {post.commentsCount}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-500/30">
                      @tonix.kg
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3.5 flex-1 flex flex-col justify-between bg-slate-850/80">
                <p className="text-xs text-slate-300 line-clamp-2 leading-snug mb-3">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick Like Button */}
                    <button
                      onClick={(e) => handleLike(e, post.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        userLikedPosts[post.id] 
                          ? 'text-pink-500 bg-pink-500/10' 
                          : 'text-slate-400 hover:text-pink-400 hover:bg-slate-800'
                      }`}
                      title="Поставить лайк"
                    >
                      <Heart className={`w-3.5 h-3.5 ${userLikedPosts[post.id] ? 'fill-pink-500' : ''}`} />
                    </button>

                    {/* External Link */}
                    <a
                      href={targetInstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Открыть пост в Instagram"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-900 border border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Следите за новыми проектами студии каждый день
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Публикуем обзоры новинок авторынка Бишкека, скидки для подписчиков и полезные советы по уходу за пленкой.
              </p>
            </div>
          </div>

          <a
            href={targetInstagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-transform hover:scale-105 shadow-xl cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Перейти в @tonix.kg</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

      </div>

      {/* Modal Post Viewer */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-750 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media side */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img 
                src={selectedPost.mediaUrl} 
                alt={selectedPost.caption} 
                className="w-full h-full object-contain max-h-[75vh]"
              />
              {selectedPost.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between bg-slate-850">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600">
                      <img 
                        src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=200&q=80" 
                        alt="Tonix" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                        <span>{instagramHandle}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                      </div>
                      <span className="text-[11px] text-slate-400">г. Бишкек, Кыргызстан</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption & Tags */}
              <div className="py-4 flex-1 overflow-y-auto space-y-3 pr-1">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {selectedPost.caption}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-pink-400 font-mono hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Опубликовано: {selectedPost.timestamp}</span>
                </div>
              </div>

              {/* Engagement & CTAs */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(e, selectedPost.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        userLikedPosts[selectedPost.id]
                          ? 'bg-pink-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${userLikedPosts[selectedPost.id] ? 'fill-white' : ''}`} />
                      <span>{selectedPost.likes}</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <MessageCircle className="w-4 h-4" />
                      <span>{selectedPost.commentsCount} комм.</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyLink(targetInstagramUrl)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Скопировать ссылку"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Booking & Instagram Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      openBookingWithPreselect('tint-rear', 'sedan');
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md text-center"
                  >
                    Записаться в бокс
                  </button>

                  <a
                    href={targetInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-center"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>В Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Story Viewer Modal */}
      {activeStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveStory(null)}
        >
          <div 
            className="relative w-full max-w-sm bg-slate-900 border border-slate-750 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Story Top Bar Progress */}
            <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
              <div className="h-1 bg-white rounded-full flex-1 animate-pulse" />
            </div>

            {/* Story Header */}
            <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-white">
                  <img src={activeStory.coverImage} alt={activeStory.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold">{instagramHandle}</span>
                <span className="text-[10px] text-slate-300">• {activeStory.title}</span>
              </div>
              <button 
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-black/40 text-white hover:bg-black/70 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Image */}
            <div className="relative aspect-[9/16] w-full bg-black">
              <img 
                src={activeStory.coverImage} 
                alt={activeStory.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
              
              <div className="absolute bottom-6 left-4 right-4 text-white space-y-3">
                <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-sm text-amber-400 mb-1">{activeStory.title}</h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeStory.description}
                  </p>
                </div>

                <a
                  href={targetInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Открыть профиль @tonix.kg</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
