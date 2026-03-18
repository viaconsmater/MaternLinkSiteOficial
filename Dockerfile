ARG RUBY_VERSION=3.3.5
FROM ruby:${RUBY_VERSION}-slim AS base

WORKDIR /var/www/core

ENV RAILS_ENV=production \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLER_VERSION=2.4.10

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl build-essential libpq-dev git pkg-config libvips postgresql-client && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/*

FROM base AS build

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY

RUN gem install bundler -v $BUNDLER_VERSION

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle \
    ${BUNDLE_PATH}/ruby/*/cache \
    ${BUNDLE_PATH}/ruby/*/bundler/gems/*/.git

COPY package.json yarn.lock ./

# Instala tudo incluindo devDependencies (vitepress está lá)
RUN NODE_ENV=development yarn install --frozen-lockfile

COPY . .

RUN printf '#!/bin/sh\nexec /var/www/core/node_modules/.bin/vitepress "$@"\n' > /usr/local/bin/vitepress && \
    chmod +x /usr/local/bin/vitepress

# NODE_ENV=development aqui também para evitar que o yarn interno
# do Rails apague os devDependencies durante o precompile
RUN export PATH="/var/www/core/node_modules/.bin:/usr/local/bin:$PATH" && \
    NODE_ENV=development SECRET_KEY_BASE=dummy bundle exec rails assets:precompile

RUN rm -rf node_modules/.cache tmp/cache

FROM base

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"]