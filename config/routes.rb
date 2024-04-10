Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'server_metrics/index'
      get 'server_metrics/average'
      get 'server_metrics/avg_per_hour'
      get 'server_metrics/avg_per_day'
      post 'server_metrics/create'
      get '/show/:id', to: 'server_metrics#show'
      delete '/destroy/:id', to: 'server_metrics#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
