Rails.application.routes.draw do

  get 'sessions/new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :microposts, only: [:create, :destroy]
  root "static_pages#home"
  get '/users/:id', to: 'users#show'
  get '/forum', to: 'static_pages#forum'
  get "/home", to: 'static_pages#home'
  get '/signup', to: 'users#new'
  get '/about', to: 'static_pages#about'
  get '/menu', to: 'static_pages#menu'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

end
