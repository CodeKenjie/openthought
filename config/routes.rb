Rails.application.routes.draw do
  get "check_username", to: "availability#username"
  get "check_email", to: "availability#email"
  resources :users, only: [ :new, :create ]
  # root "posts#index"
end
