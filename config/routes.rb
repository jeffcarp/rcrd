class LoggedInConstraint
  def initialize(value)
    @value = value
  end

  def matches?(request)
    !request.cookies.key?("user_id") == @value
  end
end

Nassau::Application.routes.draw do
  
  get 'guide' => 'home#guide', as: :guide
  get 'settings' => 'users#edit', as: 'settings'
  get 'about' => 'home#about', as: 'about'
  get 'stats' => 'home#stats', as: 'stats'
  get 'logout' => 'sessions#destroy', as: 'logout'
  get 'records/find' => 'records#find', as: 'find'

  get 'experimental' => 'home#experimental'

  resources :cats
  resources :records
  resources :sessions
  resources :users

  root :to => "home#index", :constraints => LoggedInConstraint.new(false)
  root :to => "home#welcome", :constraints => LoggedInConstraint.new(true)
end
