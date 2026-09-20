# Telegram CRM

Install:

npm install

Create database:

npx prisma migrate dev

Run:

npm run dev

Create Telegram webhook:

https://api.telegram.org/botTOKEN/setWebhook?url=https://domain.com/api/telegram/webhook

Features:
- Telegram user sync
- Prisma SQLite database
- Admin authentication
- User dashboard
- Search/filter/sort
- Broadcast foundation
- CSV export foundation
