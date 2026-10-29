# TONIX TINT STUDIO

Сайт детейлинг-центра в Бишкеке: React 19 + Vite + Tailwind, серверная часть — функции Vercel в папке `api/`.

## Как это работает

| Что | Где хранится |
| --- | --- |
| Записи клиентов | База Upstash Redis (`/api/bookings`), уведомление в Telegram |
| Услуги, цены, мастера, акции, слайды, портфолио, контакты | База (`/api/content`), правятся в админ-панели |
| Отзывы посетителей | База (`/api/reviews`), удаляются из админ-панели |

Админ-панель открывается по адресу `сайт/#admin` (или Alt+A) и требует пароль, который проверяется на сервере.

## Если клиент забыл пароль

1. Клиент нажимает «Забыли пароль? Напишите нам в WhatsApp» — открывается чат со студией с готовым сообщением.
2. Админ-панель → вкладка «Клиенты и пароли» → найти по номеру → «Сбросить пароль».
3. Отправить временный пароль кнопкой «Отправить клиенту в WhatsApp».
4. Клиент входит с временным паролем и в кабинете задаёт свой (кнопка «Пароль»).

## Настройка на Vercel (один раз)

1. **База данных.** Vercel → проект → **Storage** → **Create Database** → **Upstash Redis** (бесплатный тариф) → подключить к проекту. Переменные `KV_REST_API_URL` и `KV_REST_API_TOKEN` добавятся сами.
2. **Пароль админки.** Vercel → проект → **Settings → Environment Variables** → `ADMIN_PASSWORD` = ваш пароль.
3. **Telegram (по желанию).** Создайте бота у @BotFather, добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` (ID чата, куда слать записи).
4. **Deployments → … → Redeploy**, чтобы переменные применились.

## ИИ-помощник в WhatsApp (`/api/whatsapp`)

Отвечает клиентам в WhatsApp через Claude: цены по классу авто, акции и промокоды, свободное время мастеров (из базы записей), адрес и часы, ссылка на запись `сайт/#booking`. По просьбе клиента зовёт менеджера (уведомление в Telegram + ссылка на WhatsApp менеджера). Сам записи не создаёт и оплату не принимает. Услуги, акции и FAQ берутся из `src/data/catalog.json` (или из админки, если их там меняли).

1. developers.facebook.com → **Create App** → use case «Connect with customers through WhatsApp» → **API Setup**: номер для бота, **Phone number ID**.
2. Business Settings → **System users** → токен с правами `whatsapp_business_messaging`, `whatsapp_business_management` → `WHATSAPP_TOKEN`.
3. Приложение → Settings → Basic → **App secret** → `WHATSAPP_APP_SECRET`; придумайте `WHATSAPP_VERIFY_TOKEN`.
4. console.anthropic.com → API key → `ANTHROPIC_API_KEY`. Все переменные — в Vercel → Environment Variables, затем **Redeploy**.
5. WhatsApp → **Configuration** → Webhook: Callback URL `https://<сайт>/api/whatsapp`, Verify token = `WHATSAPP_VERIFY_TOKEN` → Verify → подписаться на поле `messages`.
6. В WhatsApp Manager привяжите способ оплаты: с 1 октября 2026 ответы сверх 1 000 в месяц платные, без карты Meta их не доставляет.

Защита: проверка подписи каждого запроса Meta, один ответ на сообщение (повторы Meta игнорируются), не больше 20 ответов клиенту в час, история разговора хранится 3 дня.

Пока база не подключена, сайт работает, но записи не сохраняются (клиент увидит просьбу позвонить), а админ-панель без `ADMIN_PASSWORD` не откроется.

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:3000, админка открывается без пароля
npm run build
```

`vercel dev` запускает сайт вместе с функциями из `api/`. Для своего сервера без Vercel есть `server.js` (`npm run build && npm start`), но он отдаёт только статику — API там не работает.
