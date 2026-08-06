Rails.application.routes.draw do
  resources :users, only: [ :new, :create ]
  # root "posts#index"
end
