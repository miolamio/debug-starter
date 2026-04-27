# Debug Starter

Учебный Next.js-проект для Демо 1 ступени 8 (Debugging) курса CC Basics.

В проект заложен баг: в `.env.local` опечатка — `RESEND_KEY` вместо `RESEND_API_KEY`. POST на `/api/apply` падает с 500, реальная ошибка глушится generic catch-блоком. Студент проходит полный цикл диагностики: передача вывода в Claude → Logging Workflow → Full Error Context → Before-After Comparison.

## Запуск

```bash
git clone https://github.com/miolamio/debug-starter.git ~/debug-demo
cd ~/debug-demo
npm install
npm run dev
```

В соседнем терминале:

```bash
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

Ожидаемый ответ: `{"error":"Something went wrong"}`. В терминале dev-сервера — только `POST /api/apply 500`, без стека.

## Что внутри

- `app/api/apply/route.ts` — API-роут с generic catch-блоком, который проглатывает реальную ошибку.
- `app/lib/email.ts` — обёртка над Resend, бросает `Error: RESEND_API_KEY is not defined` при отсутствии ключа.
- `.env.local` — содержит баг (`RESEND_KEY=fake-value` вместо `RESEND_API_KEY`).
- `.env.local.example` — правильное имя переменной для справки.

## Git-история

Репозиторий содержит два коммита:

- `HEAD~1` — Initial scaffold: apply API без email.
- `HEAD` — Send confirmation email через Resend.

Это нужно для шага «Before-After Comparison»: студент запускает `git diff HEAD~1 app/lib/email.ts` и видит, что именно изменилось «в последнем коммите».

## Что чинит студент

В `.env.local` нужно переименовать `RESEND_KEY` → `RESEND_API_KEY` и перезапустить dev-сервер. После фикса роут вернёт 500 с другой причиной (Resend API не примет fake-value), но это уже за рамками демо — главное, что прошли цикл диагностики.
