Rails.application.routes.draw do
  get "check_username", to: "availability#username"
  get "check_email", to: "availability#email"
  resources :sessions, only: [ :new, :create, :destroy ]
  resources :users, only: [ :show, :new, :create ]
  resources :posts, except: [ :new, :edit ] do
    resources :comments, only: [ :create, :update, :destroy ]
  end
  root "posts#index"
end
