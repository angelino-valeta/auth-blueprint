# BackendBlueprint
![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue) ![Docker](https://img.shields.io/badge/Docker-Compose-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)


Um backend avançado, seguro e escalável com Node.js, TypeScript, PostgreSQL, Redis e Docker, estruturado por módulos e baseado em Domain-Driven Design (DDD). Inclui autenticação JWT com Max Retry/Jail, RBAC, logs distribuídos, event sourcing, integração com sistemas externos, envio de emails, cron jobs, notificações, cache avançado, rate limiting por usuário, auditoria e filas de mensagens.


## ✨ Funcionalidades

- **Autenticação JWT**: Tokens de acesso (15min) e refresh (7 dias) com RS256, Max Retry/Jail (5 tentativas, 15min bloqueio).
- **Segurança**: AES-256, rate limiting (IP e usuário), Helmet, Zod.
- **Autorização (RBAC)**: Roles configuráveis.
- **Logs Distribuídos**: Winston com tracing via OpenTelemetry.
- **Event Sourcing**: Registro de eventos para auditoria.
- **Escalabilidade**: Stateless com JWT, Redis, cache avançado, rotas dinâmicas.
- **Automações**: Migrations com TypeORM, cron jobs.
- **Monitoramento**: Health check robusto.
- **Integração**: Sistemas externos via HTTP.
- **Email**: Envio e filas com Nodemailer.
- **Notificações**: WebSocket com broadcast.
- **Cache**: Gerenciamento avançado com Redis.
- **Auditoria**: Registro de ações sensíveis.
- **Filas**: Processamento assíncrono com Bull.

## 🛠️ Tecnologias

- **Node.js**: v18
- **TypeScript**: v5
- **Express**: Framework web
- **PostgreSQL**: Banco relacional
- **Redis**: Cache e sessões
- **TypeORM**: ORM e migrations
- **JWT**: Autenticação com RS256
- **Winston**: Logging
- **OpenTelemetry**: Logs, Metrics, Tracing
- **Nodemailer**: Email
- **Node-cron**: Cron jobs
- **WebSocket**: Notificações
- **Bull**: Filas
- **Docker**: Containerização
- **Extras**: bcryptjs, express-rate-limit, helmet, zod, axios, ws

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [OpenSSL](https://www.openssl.org/) (para gerar chaves RSA)

## 🚀 Como Rodar

```bash
git clone https://github.com/angelino-valeta/auth-blueprint.git
cd backendblueprint 
mkdir keys
openssl genrsa -out keys/private.pem 2048
openssl rsa -in keys/private.pem -pubout -out keys/public.pem
cp .env.example .env
npm install
docker-compose up --build
npm run typeorm migration:run