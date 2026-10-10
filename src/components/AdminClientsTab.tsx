import React, { useEffect, useState } from 'react';
import { KeyRound, Loader2, MessageCircle, RefreshCw, Search, Copy, Check } from 'lucide-react';
import { fetchClients, resetClientPassword, type AdminClient } from '../utils/api';

// Admin tab: client accounts and resetting a forgotten password.
export const AdminClientsTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetting, setResetting] = useState<string | null>(null);
  const [issued, setIssued] = useState<{ name: string; phone: string; tempPassword: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = async (q = query) => {
    setLoading(true);
    setError(null);
    try {
      const { clients: list } = await fetchClients(q.trim());
      setClients(list);
    } catch {
      setError('Не удалось загрузить список клиентов. Проверьте подключение к базе данных.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = async (client: AdminClient) => {
    if (!window.confirm(`Сбросить пароль клиента ${client.name} (${client.phone})? Старый пароль перестанет работать.`)) return;
    setResetting(client.phone);
    setCopied(false);
    try {
      setIssued(await resetClientPassword(client.phone));
      load();
    } catch {
      setError('Не удалось сбросить пароль. Попробуйте ещё раз.');
    } finally {
      setResetting(null);
    }
  };

  const whatsappLink = (data: { name: string; phone: string; tempPassword: string }) => {
    const digits = data.phone.replace(/\D/g, '');
    const full = digits.length === 9 ? `996${digits}` : digits.length === 10 && digits.startsWith('0') ? `996${digits.slice(1)}` : digits;
    const text = `Здравствуйте, ${data.name}! Ваш временный пароль для личного кабинета TONIX: ${data.tempPassword}\nВойдите на сайте по номеру телефона и этому паролю, затем задайте свой новый пароль.`;
    return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('ru-RU');
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h4 className="text-sm font-extrabold text-white">Клиенты с личным кабинетом</h4>
        <p className="text-xs text-slate-400 mt-1">
          Если клиент забыл пароль: найдите его по номеру, нажмите «Сбросить пароль» и отправьте временный пароль в WhatsApp.
          После входа клиент сам задаст новый пароль.
        </p>
      </div>

      {issued && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
          <div className="text-xs text-emerald-300">
            Временный пароль для <strong>{issued.name}</strong> ({issued.phone}). Он показывается только сейчас:
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-black font-mono tracking-widest text-white select-all">{issued.tempPassword}</span>
            <button
              onClick={() => copy(issued.tempPassword)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Скопировано' : 'Копировать'}
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a
              href={whatsappLink(issued)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold"
            >
              <MessageCircle className="w-4 h-4" />
              Отправить клиенту в WhatsApp
            </a>
            <button
              onClick={() => setIssued(null)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              Готово
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Имя или номер телефона"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Найти
        </button>
      </form>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {!loading && clients.length === 0 && !error && (
        <p className="text-sm text-slate-400">{query ? 'Никого не найдено.' : 'Пока никто не зарегистрировался.'}</p>
      )}

      <div className="space-y-2">
        {clients.map((c) => (
          <div
            key={c.phone}
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-extrabold text-white">{c.name}</span>
                {c.mustChangePassword && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    временный пароль
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {c.phone} • записей: {c.bookings} • с {formatDate(c.createdAt)}
              </div>
            </div>
            <button
              onClick={() => reset(c)}
              disabled={resetting === c.phone}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-xs font-bold text-slate-200 cursor-pointer"
            >
              {resetting === c.phone ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5 text-amber-400" />}
              Сбросить пароль
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
