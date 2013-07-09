class LoggedInConstraint
  def initialize(value)
    @value = value
  end

  def matches?(request)
    !request.cookies.key?("user_id") == @value
  end
end

Nassau::Application.routes.draw do
  
  get 'guide' => 'home#guide', as: 'guide'
  get 'settings' => 'users#edit', as: 'settings'
  get 'logout' => 'sessions#destroy', as: 'logout'

  get 'experimental' => 'home#experimental'

  resources :cats
  resources :records
  resources :sessions
  resources :users

  root :to => "home#index", :constraints => LoggedInConstraint.new(false)
  root :to => "home#welcome", :constraints => LoggedInConstraint.new(true)
end
