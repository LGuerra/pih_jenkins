FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nginx supervisor
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install
RUN echo 'daemon off;' >> /etc/nginx/nginx.conf
ADD . /app
RUN cat nginx-production.conf > /app/config/nginx.conf
RUN mv /app/config/nginx.conf /etc/nginx/sites-enabled/default
# ADD config/nginx.conf /etc/nginx/sites-enabled/default
ADD config/supervisor.conf /etc/supervisor/conf.d/railsapp.conf
EXPOSE 80
CMD ["supervisord", "-n"]
