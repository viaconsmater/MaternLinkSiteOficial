# Setup para Digital Ocean PostgreSQL

## ✅ O que foi configurado

1. **database.yml** - Atualizado para usar variáveis de ambiente
2. **.env** - Arquivo de variáveis (não será commitado)
3. **.env.example** - Template para referência
4. **docker-compose.prod.yml** - Configuração para produção
5. **Dockerfile** - Otimizado com EXPOSE e CMD
6. **DEPLOY_GUIDE.md** - Guia completo de deploy

## 🚀 Passo a Passo para Deploy

### 1. Obter Credenciais do Banco Digital Ocean

```
Digital Ocean Console → Databases → Seu PostgreSQL
→ Connection Details → Copiar Connection String
```

Será parecido com:
```
postgresql://doadmin:senha@db-host.db.ondigitalocean.com:25060/dbname?sslmode=require
```

### 2. Configurar Arquivo .env Local

```bash
nano .env
```

Adicione:
```
DATABASE_URL=postgresql://seu_usuario:seu_password@seu_host:sua_porta/seu_banco?sslmode=require
RAILS_ENV=production
RAILS_MASTER_KEY=seu_master_key
SENDGRID_API_KEY=seu_key
PAYMENT_API_KEY=seu_key
HOST=seu-dominio.com.br
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` (já está em .gitignore)

### 3. Testar Localmente

```bash
# Carregar variáveis
export $(cat .env | xargs)

# Teste a conexão
rails db:version

# Se funcionar, execute migrações
RAILS_ENV=production rails db:migrate

# Compile assets (opcional para teste local)
RAILS_ENV=production rails assets:precompile
```

### 4. Fazer Push para Git

```bash
git add .
git commit -m "Configure PostgreSQL Digital Ocean"
git push origin main
```

### 5. Deploy no Digital Ocean

**Opção A: App Platform (Recomendado)**
- https://cloud.digitalocean.com/apps
- Create App → Selecione seu repositório
- Configure Environment Variables (mesmas do .env)
- Selecione Database existente
- Deploy

**Opção B: VPS Docker**
```bash
# No seu VPS
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Variáveis de Ambiente Necessárias

| Variável | Exemplo | Obrigatória |
|----------|---------|------------|
| DATABASE_URL | postgresql://user:pass@host:port/db | ✅ SIM |
| RAILS_ENV | production | ✅ SIM |
| RAILS_MASTER_KEY | sua_chave | ✅ SIM |
| HOST | seu-dominio.com.br | ✅ SIM |
| SENDGRID_API_KEY | SG.xxx | ⚠️ Se usar email |
| PAYMENT_API_KEY | xxx | ⚠️ Se usar pagamentos |

## 🧪 Verificar Setup

Execute este script para validar:
```bash
bash scripts/deploy-checklist.sh
```

## 🆘 Troubleshooting

**Erro: "could not translate host name"**
- Verifique o host em DATABASE_URL
- Certifique-se que a sintaxe está correta

**Erro: "connection refused"**
- Verifique se o banco está ativo no Digital Ocean
- Confira credenciais de usuário/senha

**Erro: "permission denied"**
- O usuário pode não ter permissões
- Crie um novo usuário/role no banco

**Testar Conexão:**
```bash
psql "postgresql://user:password@host:port/database?sslmode=require"
```

## 📚 Arquivos Modificados

- ✅ config/database.yml
- ✅ Dockerfile
- ✅ Criado: .env (local, não versionado)
- ✅ Criado: .env.example
- ✅ Criado: docker-compose.prod.yml
- ✅ Criado: DEPLOY_GUIDE.md
- ✅ Criado: scripts/deploy-checklist.sh

---

**Está tudo pronto! Agora é só configurar as credenciais e fazer o push! 🎉**
