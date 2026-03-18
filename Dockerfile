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

# Dependências
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
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn vitepress

# =========================
# 🔧 Stage 2 - Build
# =========================
FROM base AS build

# Recebe a master key como build arg
ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY

# Instala bundler correto
RUN gem install bundler -v $BUNDLER_VERSION

# Copia Gemfile primeiro (cache)
COPY Gemfile Gemfile.lock ./

# Instala gems
RUN bundle install && \
    rm -rf ~/.bundle \
    ${BUNDLE_PATH}/ruby/*/cache \
    ${BUNDLE_PATH}/ruby/*/bundler/gems/*/.git

# Copia projeto
COPY . .

# Precompile com SECRET_KEY_BASE dummy e RAILS_MASTER_KEY real
RUN SECRET_KEY_BASE=dummy bundle exec rails assets:precompile

# =========================
# 🚀 Stage 3 - Final
# =========================
FROM base

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"]