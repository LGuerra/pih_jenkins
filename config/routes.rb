Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'} 

  get 'helpers/logout' => 'helpers#custom_logout', as: :custom_logout
  get 'helpers/user_info'
  get 'health_check' => 'health_check#index'

  # TODO change '/2013-01-01/*url' for tunneling
  get   '/2013-01-01/*url', to: 'api#tunnel_request_cloud'
  get   "/v1/#{ENV['API_STAGE']}/*url", to: 'api#tunnel_request'
  post  "/v1/#{ENV['API_STAGE']}/*url", to: 'api#tunnel_request_post'

  root  'pages#react'

  get   '*path' => 'pages#react', as: :react, constraints: -> (req) { !(req.fullpath =~ /^\/assets\/.*/) }
end
