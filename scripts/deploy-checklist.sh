#!/bin/bash

# Checklist para Deploy na Digital Ocean com PostgreSQL
# Execute este script para verificar tudo antes do push

echo "=========================================="
echo "CHECKLIST DE DEPLOY - DIGITAL OCEAN"
echo "=========================================="
echo ""

# Verificar arquivo .env
echo "✓ Verificando arquivo .env..."
if [ -f .env ]; then
    if grep -q "DATABASE_URL" .env; then
        echo "  ✓ DATABASE_URL encontrado em .env"
    else
        echo "  ✗ DATABASE_URL NÃO encontrado em .env"
        echo "    Adicione: DATABASE_URL=postgresql://..."
    fi
else
    echo "  ✗ Arquivo .env não existe"
    echo "    Copie de .env.example: cp .env.example .env"
fi

echo ""

# Verificar Gemfile
echo "✓ Verificando Gemfile..."
if grep -q "pg\|postgres" Gemfile; then
    echo "  ✓ Gem PostgreSQL encontrada"
else
    echo "  ✗ Gem PostgreSQL não está no Gemfile"
fi

echo ""

# Verificar database.yml
echo "✓ Verificando database.yml..."
if grep -q "ENV\['DATABASE_URL'\]" config/database.yml; then
    echo "  ✓ database.yml configurado para usar variáveis de ambiente"
else
    echo "  ✗ database.yml pode não estar otimizado"
fi

echo ""

# Verificar .gitignore
echo "✓ Verificando .gitignore..."
if grep -q "\.env" .gitignore; then
    echo "  ✓ .env está em .gitignore (não será commitado)"
else
    echo "  ✗ .env pode ser commitado acidentalmente"
fi

echo ""

# Resumo
echo "=========================================="
echo "PRÓXIMOS PASSOS:"
echo "=========================================="
echo "1. Configure DATABASE_URL no arquivo .env"
echo "2. Teste: RAILS_ENV=production rails db:version"
echo "3. Execute: git add . && git commit && git push"
echo "4. Deploy no Digital Ocean App Platform"
echo ""
echo "=========================================="
