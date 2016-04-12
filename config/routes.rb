Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users

  get 'helpers/logout' => 'helpers#custom_logout', as: :custom_logout
  get 'helpers/user_info'
  get 'health_check' => 'health_check#index'

  root  'pages#react'
  get   'reporte' => 'pages#reporte', as: :reporte
  get   '/2013-01-01/*url', to: 'api#tunnel_request_cloud'
  get   "/v1/#{ENV['API_STAGE']}/*url", to: 'api#tunnel_request'
  post  "/v1/#{ENV['API_STAGE']}/*url", to: 'api#tunnel_request_post'

  get   '/app/*route' => 'pages#react', as: :react
end
