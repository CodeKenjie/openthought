Rails.application.routes.draw do
  get "check_username", to: "availability#username"
  get "check_email", to: "availability#email"
  resources :sessions, only: [ :new, :create, :destroy ]
  resources :users, only: [ :show, :new, :create, :update ]
  resources :posts, except: [ :new, :edit ] do
    resources :comments, only: [ :show, :create, :update, :destroy ] do
      resources :replies, only: [ :create, :update, :destroy ]
    end
  end
  root "posts#index"
end
