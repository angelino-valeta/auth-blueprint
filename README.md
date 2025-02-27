# AuthBlueprint

![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue) ![Docker](https://img.shields.io/badge/Docker-Compose-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)


Um backend robusto, seguro e escalável construído com Node.js, TypeScript, PostgreSQL, Redis e Docker. Projetado como um blueprint reutilizável para qualquer aplicação que precise de autenticação JWT, gerenciamento de roles (RBAC), logs estruturados, e suporte a milhões de requisições. Inclui boas práticas de segurança, automação de banco de dados, e uma arquitetura modular para fácil expansão.


## ✨ Funcionalidades

- **Autenticação JWT**: Tokens de acesso (15min) e refresh tokens (7 dias) com algoritmo RS256.
- **Segurança**: Criptografia AES-256 para dados sensíveis, rate limiting, headers seguros (Helmet), e validação de entrada (Zod).
- **Autorização (RBAC)**: Sistema de roles com permissões configuráveis.
- **Logs Estruturados**: Integração com Winston para logs em console e arquivos.
- **Escalabilidade**: Design stateless com Redis para cache e revogação de tokens.
- **Automações**: Migrations com TypeORM para gerenciamento do banco de dados.
- **Monitoramento**: Health check básico (expansível com Prometheus).
- **Containerização**: Docker Compose para deploy consistente.
