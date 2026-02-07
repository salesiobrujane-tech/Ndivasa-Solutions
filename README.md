# Ndivasa Limpeza & Manutenção

Website profissional com foco em conversão para uma empresa de limpeza e manutenção de edifícios em Moçambique. Inclui marcação online, integração WhatsApp, envio de email e painel administrativo.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite (dev) / PostgreSQL (produção)
- Nodemailer (email)

## Como executar localmente

1. Instale dependências:
   ```bash
   npm install
   ```

2. Configure variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. Gere o Prisma Client e crie o banco SQLite:
   ```bash
   npm run prisma:generate
   npx prisma migrate dev --name init
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

A aplicação estará em `http://localhost:3000`.

## Produção (PostgreSQL)

Atualize o `DATABASE_URL` no `.env` para a string de conexão PostgreSQL, por exemplo:

```
DATABASE_URL="postgresql://user:password@host:5432/ndivasa?schema=public"
```

Em seguida, rode:

```bash
npx prisma migrate deploy
npm run build
npm start
```

## Endpoints principais
- `POST /api/bookings` — cria marcação e envia email.
- `GET /api/admin/bookings` — lista marcações (protegido por senha).
- `POST /api/admin/login` — autenticação simples para admin.

## Funcionalidades
- Formulário de marcação em passos (wizard) mobile-first.
- Integração WhatsApp com mensagem pré-preenchida.
- SEO com meta tags, OpenGraph, sitemap e robots.
- Admin com filtros e exportação CSV.

## Deploy
- Vercel: basta ligar o repositório, configurar as variáveis de ambiente e definir `DATABASE_URL` para PostgreSQL.
- Render / Railway / Fly.io: use o mesmo `DATABASE_URL` e rode `prisma migrate deploy`.

