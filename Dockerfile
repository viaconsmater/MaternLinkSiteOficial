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

# Dependências do sistema
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

# Node + Yarn
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

# Instala bundler
RUN gem install bundler -v $BUNDLER_VERSION

# Copia Gemfile primeiro para aproveitar cache
COPY Gemfile Gemfile.lock ./

# Instala gems
RUN bundle install && \
    rm -rf ~/.bundle \
    ${BUNDLE_PATH}/ruby/*/cache \
    ${BUNDLE_PATH}/ruby/*/bundler/gems/*/.git

# Copia package.json e yarn.lock primeiro para aproveitar cache
COPY package.json yarn.lock ./

# Instala dependências JS
RUN yarn install --frozen-lockfile

# Cria symlink para o vitepress instalado pelo yarn
RUN ln -sf /var/www/core/node_modules/.bin/vitepress /usr/local/bin/vitepress

# Copia o restante do projeto
COPY . .

# Precompile assets
RUN SECRET_KEY_BASE=dummy bundle exec rails assets:precompile

# Remove arquivos desnecessários do build
RUN rm -rf node_modules/.cache tmp/cache

# =========================
# 🚀 Stage 3 - Final
# =========================
FROM base

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"]