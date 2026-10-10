import React, { useState } from 'react';
import { Lock, X, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MESSAGES: Record<string, string> = {
  wrong_password: 'Неверный пароль.',
  not_configured:
    'Пароль администратора ещё не задан. Добавьте переменную ADMIN_PASSWORD в настройках проекта на Vercel и сделайте Redeploy.',
  network_error: 'Сервер недоступен. Проверьте подключение и попробуйте ещё раз.',
};

export const AdminLoginModal: React.FC = () => {
  const { isAdminOpen, isAdminAuthed, setIsAdminOpen, loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAdminOpen || isAdminAuthed) return null;

  const close = () => {
    setIsAdminOpen(false);
    setPassword('');
    setError(null);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError(null);
    const result = await loginAdmin(password);
    setLoading(false);
    if (result === 'ok') {
      setPassword('');
    } else {
      setError(MESSAGES[result]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-4"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Вход для администратора</h3>
            <p className="text-xs text-slate-400">TONIX TINT STUDIO</p>
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">Пароль</span>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </label>

        {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

        <button
          type="submit"
          disabled={!password || loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-sm font-extrabold cursor-pointer disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Войти
        </button>
      </form>
    </div>
  );
};
