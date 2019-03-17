Rails.application.routes.draw do
  get 'home/index'
  devise_for :users
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # root to: "posts#index"
  root 'home#index'
  get '/blog', to: 'posts#index'

  resources :conversations, only: [:create] do
    member do
      post :close
    end

    resources :messages, only: [:create]
  end
end
