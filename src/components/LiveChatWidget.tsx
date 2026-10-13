import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CheckCheck, 
  Calendar, 
  HelpCircle 
} from 'lucide-react';
import { TonixLogo } from './TonixLogo';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const { isChatOpen, setIsChatOpen, setIsBookingOpen, studioSettings } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Здравствуйте! Я онлайн-консультант TONIX TINT STUDIO Бишкек. Чем могу помочь: рассчитать стоимость тонировки, проконсультировать по разрешению МВД или записать на бронирование PPF?',
      time: '12:00'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate responsive bot reply
    setTimeout(() => {
      let botResponse = `Спасибо за вопрос! Я автоматический помощник, а живой ответ даст ${studioSettings.contactPerson.split('(')[0].trim()}: напишите в WhatsApp ${studioSettings.whatsapp} или позвоните ${studioSettings.phone}. Записаться можно прямо на сайте.`;
      const lower = text.toLowerCase();

      if (lower.includes('разреш') || lower.includes('унаа') || lower.includes('тюндюк') || lower.includes('тундук')) {
        botResponse = 'Официальное разрешение на тонировку передних боковых стекол выдает ГУ «Унаа» при МВД КР через портал «Түндүк». Мы бесплатно помогаем нашим клиентам заполнить заявку и получить квитанцию!';
      } else if (lower.includes('цен') || lower.includes('стоим') || lower.includes('передн') || lower.includes('задн')) {
        botResponse = 'Тонировка задней полусферы (Llumar ATR) — от 4 500 сом. Передние боковые — от 3 500 сом. Наш интерактивный калькулятор на сайте рассчитает точную сумму для вашей марки!';
      } else if (lower.includes('где') || lower.includes('адрес') || lower.includes('находит')) {
        botResponse = `Наш адрес: ${studioSettings.address}. У нас удобный заезд и закрытая охраняемая парковка. Режим работы: ${studioSettings.workHours}.`;
      } else if (lower.includes('пленк') || lower.includes('ppf') || lower.includes('брон')) {
        botResponse = 'Мы работаем исключительно с оригинальным американским полиуретаном STEK DYNOshield и LLumar Platinum (толщина 215 микрон с функцией самозатягивания царапин Top-Coat). Гарантия 10 лет!';
      }

      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const quickQuestions = [
    'Сколько стоит тонировка передних?',
    'Как оформить разрешение в Түндүк?',
    'Где вы находитесь в Бишкеке?',
    'Какая гарантия на бронепленку?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="relative p-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all flex items-center justify-center glow-amber cursor-pointer"
          title="Онлайн-чат поддержки"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
          <MessageSquare className="w-6 h-6 stroke-[2.3]" />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="relative w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TonixLogo size={36} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-950 rounded-full" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-white">TONIX TINT Support</div>
                <div className="text-[10px] text-emerald-400">Студия в Бишкеке • Онлайн</div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-2.5 bg-slate-950/60 border-b border-slate-800/80 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 hover:border-amber-500/50 hover:text-amber-400 shrink-0 cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp Direct link banner */}
          <div className="px-4 py-2 bg-emerald-950/40 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400">Нужен ответ мастера лично?</span>
            <a
              href="https://wa.me/996700910777?text=Здравствуйте!%20Пишу%20из%20онлайн-чата%20Tonix%20Tint%20Studio"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-300 underline"
            >
              В WhatsApp →
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Напишите вопрос..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
