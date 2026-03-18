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

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl \
    build-essential \
    libpq-dev \
    git \
    pkg-config \
    libvips \
    postgresql-client && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/*

# =========================
# 📦 Stage 2 - Build
# =========================
FROM base AS build

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY \
    PATH="/var/www/core/node_modules/.bin:$PATH"

RUN gem install bundler -v $BUNDLER_VERSION

COPY Gemfile Gemfile.lock ./

RUN bundle install && \
    rm -rf ~/.bundle \
    ${BUNDLE_PATH}/ruby/*/cache \
    ${BUNDLE_PATH}/ruby/*/bundler/gems/*/.git

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copia o projeto ANTES de criar o wrapper
COPY . .

# Cria wrapper real em vez de symlink — garante que funciona mesmo
# quando bundle exec redefine o PATH
RUN VITEPRESS_PATH="/var/www/core/node_modules/.bin/vitepress" && \
    test -f "$VITEPRESS_PATH" || (echo "ERRO: vitepress não encontrado em node_modules/.bin" && exit 1) && \
    printf '#!/bin/sh\nexec "%s" "$@"\n' "$VITEPRESS_PATH" > /usr/local/bin/vitepress && \
    chmod +x /usr/local/bin/vitepress

# Precompile com PATH explícito para garantir
RUN export PATH="/var/www/core/node_modules/.bin:/usr/local/bin:$PATH" && \
    SECRET_KEY_BASE=dummy bundle exec rails assets:precompile

RUN rm -rf node_modules/.cache tmp/cache

# =========================
# 🚀 Stage 3 - Final
# =========================
FROM base

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"]