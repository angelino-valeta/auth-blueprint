# COMMIT_GUIDELINES.md

## Diretrizes para Mensagens de Commit

Este documento define o padrão para mensagens de commit no nosso projeto. Seguir este formato ajuda a manter o histórico claro, facilita a geração de changelogs e melhora a colaboração no time.

### Formato das Mensagens de Commit

As mensagens de commit devem seguir este padrão:

<tipo>(<escopo>): <descrição curta>
<linha em branco>
<descrição longa (opcional)>


#### Funcionalidades
1. **Tipo**: Indica o propósito do commit. Opções permitidas:
   - `feat`: Nova funcionalidade
   - `fix`: Correção de bug
   - `docs`: Alteração na documentação
   - `style`: Mudanças de formatação (sem alterar lógica)
   - `refactor`: Refatoração de código
   - `test`: Adição ou melhoria de testes
   - `chore`: Tarefas gerais (ex.: atualização de dependências)

2. **Escopo (opcional)**: Parte do projeto afetada (ex.: `auth`, `api`,).

3. **Descrição curta**: Frase curta (máximo 72 caracteres) no imperativo, descrevendo a mudança (ex.: "adicionar validação de email").

4. **Descrição longa (opcional)**: Mais detalhes, como contexto ou referência a issues (ex.: "Resolve #123").

#### Exemplos

feat(auth): adicionar login com OAuth

Implementa autenticação via Google OAuth no endpoint /login.
Resolve issue #123.

fix(api): corrigir erro 500 na rota de logout



### Automação com Commitlint

Para garantir que todos os commits sigam este padrão, usamos o *Commitlint* com *Husky*. Veja como configurar:

#### 1. Instalar Dependências
No diretório do projeto, execute:
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky