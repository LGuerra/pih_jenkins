FROM ruby:2.2.4
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nginx supervisor
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install
RUN echo 'daemon off;' >> /etc/nginx/nginx.conf
ADD config/nginx.conf /etc/nginx/sites-enabled/default
ADD config/supervisor.conf /etc/supervisor/conf.d/railsapp.conf
ADD . /app
EXPOSE 80
CMD ["supervisord", "-n"]
