# Guia de Deploy - Digital Ocean + PostgreSQL

## 1. Preparar as Credenciais do PostgreSQL Digital Ocean

1. Acesse https://cloud.digitalocean.com/databases
2. Selecione seu banco PostgreSQL
3. Na aba **Connection Details**, copie a **Connection string**
4. Exemplo: `postgresql://user:password@db-host.db.ondigitalocean.com:25060/dbname?sslmode=require`

## 2. Configurar Variáveis de Ambiente Localmente

```bash
# Edite o arquivo .env na raiz do projeto
nano .env

# Adicione:
DATABASE_URL=postgresql://seu_usuario:seu_password@seu_host:sua_porta/seu_banco?sslmode=require
RAILS_ENV=production
SENDGRID_API_KEY=seu_api_key
PAYMENT_API_KEY=seu_payment_key
HOST=seu-dominio.com.br
```

## 3. Teste Localmente

```bash
# Carregue as variáveis de ambiente
export $(cat .env | xargs)

# Teste a conexão com o banco
rails db:version

# Rode as migrações
RAILS_ENV=production rails db:migrate

# Compile assets
RAILS_ENV=production rails assets:precompile
```

## 4. Fazer Push para Repositório Git

```bash
# Certifique-se que .env NÃO está commitado (já está em .gitignore)
git add .
git commit -m "Configure database para Digital Ocean PostgreSQL"
git push origin main
```

## 5. Deploy na Digital Ocean App Platform

### Opção A: Usando Digital Ocean App Platform

1. Acesse https://cloud.digitalocean.com/apps
2. Clique em **Create App**
3. Selecione seu repositório GitHub
4. Configure:
   - **Source:** seu repositório
   - **Branch:** main
   - **Build Command:** `bundle exec rails db:migrate && bundle exec rails assets:precompile`
   - **Run Command:** `bundle exec puma -t 5:5 -p ${PORT:-3000}`

5. Na aba **Environment**, adicione as variáveis:
   ```
   DATABASE_URL=postgresql://...
   RAILS_ENV=production
   SENDGRID_API_KEY=...
   PAYMENT_API_KEY=...
   HOST=seu-dominio.com.br
   RAILS_MASTER_KEY=sua_chave_master
   ```

6. Na aba **Database**, selecione sua instância PostgreSQL existente

### Opção B: Usando Docker + Digital Ocean Container Registry

```bash
# Build a imagem
docker build -t seu_app:latest .

# Tag para Digital Ocean
docker tag seu_app:latest registry.digitalocean.com/seu_registry/seu_app:latest

# Push
docker push registry.digitalocean.com/seu_registry/seu_app:latest

# Deploy com docker-compose em VPS
docker-compose -f docker-compose.prod.yml up -d
```

## 6. Verificar Conexão com Banco

```bash
# Dentro da aplicação em produção
rails console

# Teste a conexão
ActiveRecord::Base.connection.execute("SELECT version();")
```

## 7. Monitorar Logs

```bash
# Logs da aplicação
tail -f /var/log/app.log

# Ou pela aba Logs no Digital Ocean App Platform
```

## 8. Atualizar Domínio (se aplicável)

- Configure o domínio nas **App Settings** → **Domains**
- Adicione seu SSL certificate

## Troubleshooting

### Erro: "could not translate host name"
- Verifique se o host do banco está correto em `DATABASE_URL`
- Certifique-se que não há caracteres especiais não escapados na senha

### Erro: "permission denied"
- O usuário pode não ter permissão. Verifique as credenciais
- Crie um novo usuário no banco se necessário

### Banco não conecta
- Teste com `psql`:
```bash
psql "postgresql://user:password@host:port/database?sslmode=require"
```

---

**Próximos passos:**
1. Copie sua CONNECTION STRING do PostgreSQL Digital Ocean
2. Coloque no arquivo `.env` (não commita este arquivo!)
3. Siga os passos 3-7 acima
