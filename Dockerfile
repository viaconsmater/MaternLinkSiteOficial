ARG RUBY_VERSION=3.3.5
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

ARG RAILS_ENV='development'
WORKDIR /var/www/core

ENV RAILS_ENV=$RAILS_ENV \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLER_VERSION=2.4.10

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install --no-install-recommends -y nodejs && \
    npm install -g yarn && \
    yarn install

FROM base as build

RUN apt-get install --no-install-recommends -y build-essential git libvips pkg-config libpq-dev

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

COPY . .

RUN bundle exec bootsnap precompile --gemfile

FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl postgresql-client libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /var/www/core /var/www/core

EXPOSE 3000

ENTRYPOINT ["/bin/bash"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
