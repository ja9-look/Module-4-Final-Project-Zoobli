Rails.application.routes.draw do
  resources :descriptions
  resources :tags
  resources :scores
  resources :images
  resources :users
end
