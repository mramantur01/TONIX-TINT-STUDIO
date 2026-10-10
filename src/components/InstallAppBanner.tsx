import React, { useEffect, useState } from 'react';
import { Download, Share, SquarePlus, X } from 'lucide-react';

// Chrome/Android fires this event when the site can be installed as an app.
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = 'tonixtint_install_dismissed';
const DISMISS_DAYS = 14;

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const isMobile = () => /android|iphone|ipad|ipod/i.test(navigator.userAgent) || isIos();

const recentlyDismissed = () => {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

export const InstallAppBanner: React.FC = () => {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone() || !isMobile() || recentlyDismissed()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as InstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);

    // iPhone has no install prompt: show the banner with manual instructions after a short delay.
    let timer: number | undefined;
    if (isIos()) timer = window.setTimeout(() => setVisible(true), 4000);

    const onInstalled = () => setVisible(false);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (installEvent) {
      await installEvent.prompt();
      await installEvent.userChoice.catch(() => null);
      setInstallEvent(null);
      setVisible(false);
    } else {
      setShowIosHelp(true);
    }
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="relative rounded-2xl bg-slate-900/95 backdrop-blur border border-amber-500/30 shadow-2xl p-4">
        <button
          onClick={dismiss}
          aria-label="Закрыть"
          className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!showIosHelp ? (
          <div className="flex items-center gap-3 pr-6">
            <img src="/icons/icon-192.png" alt="" className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-white">Приложение TONIX</div>
              <div className="text-[11px] text-slate-400 leading-snug">
                Запись и статус заказа в один тап с экрана телефона
              </div>
            </div>
            <button
              onClick={install}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Установить
            </button>
          </div>
        ) : (
          <div className="space-y-2 pr-6">
            <div className="text-sm font-extrabold text-white">Как установить на iPhone</div>
            <ol className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-black">1.</span>
                Нажмите <Share className="w-4 h-4 text-sky-400 inline" /> «Поделиться» внизу экрана Safari
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-black">2.</span>
                Выберите <SquarePlus className="w-4 h-4 text-slate-200 inline" /> «На экран „Домой“»
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-black">3.</span>
                Нажмите «Добавить» — иконка TONIX появится на экране
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
