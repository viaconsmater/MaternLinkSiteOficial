# Viaconsultas

Plataforma de agendamento de consultas e exames

## Requisitos

- Ruby 3.3.5
- NodeJs > 18
- Yarn

## Quick Start

- `bundle install`
- `yarn install`
- Configure as variáveis de ambiente
- `rails db:setup`
- `./bin/dev`

## Configurações de variáveis de ambiente

Crie um arquivo chamado config/application.yml no seguinte formato:

```yaml
# Necessárias para ambiente local
DB_USER: ''
DB_PASSWORD: ''

# Não necessárias para ambiente local
SENDGRID_API_KEY: ''
SENDGRID_SENDER_EMAIL: ''

# Conexão com o assas
PAYMENT_API_KEY: ''
PAYMENT_API_URL: ''
```

## Diagrama do Banco de dados

- https://dbdiagram.io/d/Viaconsultas-661ec2b803593b6b6127d536
