workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup DefaultRackup
environment ENV['RACK_ENV'] || 'production'

bind 'unix:///var/run/puma.sock'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
