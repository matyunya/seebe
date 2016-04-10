Rails.application.routes.draw do
  resources :cashboxes
  resources :rows
  resources :sections
  resources :halls
  root to: 'visitors#index'
  devise_for :users, :controllers => {:registrations => 'registrations'}
  resources :users
  resources :concerts
  resources :tickets
  post 'concert/set_moderated', to: 'concerts#set_moderated'
  post 'cashbox/transfer', to: 'cashboxes#transfer'
  post 'ticket/return', to: 'tickets#return'
  post 'ticket/custom', to: 'row_prices#create'
  get 'tickets/check/:hash', to: 'tickets#check_in', as: :check
end
