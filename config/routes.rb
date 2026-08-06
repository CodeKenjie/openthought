Rails.application.routes.draw do
  get "check_username", to: "availability#username"
  get "check_email", to: "availability#email"
  resources :users, only: [ :new, :create ]
  resources :sessions, only: [ :new, :create, :destroy ]
  root "sessions#new"
end
