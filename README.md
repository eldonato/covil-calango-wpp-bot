# Projeto WPP Bot

Bot para responder mensagens em grupos do WhatsApp e enviar lembretes periódicos.

## Requisitos

- Node.js 20.19.0 ou superior.
- Uma sessão autenticada do WhatsApp. Na primeira execução, o QR code será exibido no terminal.

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Opcional: nomes ou JIDs separados por vírgula. Sem valor, usa todos os grupos da conta.
# WHATSAPP_GROUPS=Grupo Teste Bot,Outro Grupo
# Também pode usar JIDs de grupos, por exemplo 120363000000000000@g.us.
SCHEDULE_JOB_PERIODICITY=0 9 * * *
SESSION_PATH=./auth_info
OPENROUTER_API_KEY=
ENABLE_AI_RESPONSES=false
MENTION_ALL_ON_REMINDER=false
```

Instale as dependências e inicie o bot:

```sh
npm ci
npm start
```

`WHATSAPP_GROUPS` é opcional. Se omitida ou vazia, o bot obtém os JIDs de todos os grupos dos quais a conta participa; se preenchida, aceita nomes ou JIDs separados por vírgulas para selecionar os grupos. O bot precisa fazer parte de cada grupo. Ele escuta mensagens e envia um lembrete diário para todos os grupos selecionados. `SCHEDULE_JOB_PERIODICITY` usa uma expressão cron e, por padrão, `0 9 * * *` agenda a postagem para as 9h, de acordo com o fuso horário local do processo. A sessão é mantida em `SESSION_PATH`: guarde esse diretório entre reinícios e não compartilhe nem versione os arquivos de autenticação.

`ENABLE_AI_RESPONSES` controla as respostas da IA e é `false` por padrão. Para habilitá-las, defina como `true` e informe `OPENROUTER_API_KEY`; mesmo habilitada, a IA só responde mensagens que citam uma mensagem enviada pelo bot. `MENTION_ALL_ON_REMINDER` controla se o lembrete marca todos os participantes do grupo e também é `false` por padrão. Os valores são reconhecidos sem diferenciar maiúsculas de minúsculas.

As mensagens enviadas pelo bot ficam centralizadas em `src/messages.js`, incluindo respostas padrão e textos dos lembretes.

O conteúdo de `conhecimento.md`, na raiz do projeto, é enviado como contexto em cada pergunta à IA. Edite esse arquivo para atualizar as informações de referência usadas nas respostas.

## Docker

No servidor, instale o Docker e copie o projeto (sem compartilhar o arquivo `.env`). Crie o `.env` com as variáveis necessárias e inicie o bot com Docker Compose:

```sh
docker compose up -d --build
```

O arquivo `compose.yaml` configura reinício automático e um volume persistente para a sessão do WhatsApp. O bot não precisa publicar nenhuma porta: ele mantém a conexão de saída com o WhatsApp. Na primeira execução, acompanhe `docker compose logs -f` e leia o QR code para autenticar. Não compartilhe esses logs enquanto o QR estiver visível. Para atualizar o bot após enviar as mudanças ao servidor, execute novamente `docker compose up -d --build`. O `.dockerignore` impede que `.env` e arquivos de autenticação sejam incluídos na imagem.