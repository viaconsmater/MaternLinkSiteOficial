# =========================
# 🔧 Stage 1 - Base
# =========================
ARG RUBY_VERSION=3.3.5
FROM ruby:${RUBY_VERSION}-slim AS base

WORKDIR /var/www/core

ENV RAILS_ENV=production \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLER_VERSION=2.4.10 \
    NODE_ENV=production

# Dependências básicas
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl \
    build-essential \
    libpq-dev \
    git \
    pkg-config \
    libvips \
    postgresql-client

# =========================
# 📦 Node + Yarn
# =========================
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# =========================
# 🔧 Stage 2 - Build
# =========================
FROM base AS build

# Copia dependências Ruby
COPY Gemfile Gemfile.lock ./

RUN gem install bundler -v $BUNDLER_VERSION && \
    bundle install && \
    rm -rf ~/.bundle \
    ${BUNDLE_PATH}/ruby/*/cache \
    ${BUNDLE_PATH}/ruby/*/bundler/gems/*/.git

# Copia projeto inteiro
COPY . .

# Pré-compila assets (IMPORTANTE)
RUN bundle exec rails assets:precompile

# =========================
# 🚀 Stage 3 - Final
# =========================
FROM base

# Copia tudo pronto do build
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

# Expõe porta
EXPOSE 3000

# 🚀 COMANDO CORRETO (SEM BASH ERRADO)
CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"]