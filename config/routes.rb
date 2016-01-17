Rails.application.routes.draw do
  root to: 'visitors#index'
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  resources :concerts
  resources :tickets
  post 'concert/set_moderated', to: 'concerts#set_moderated'
end
