class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user
 
  private

  def current_user 
    @current_user ||= User.find(cookies.signed[:user_id]) if cookies.signed[:user_id]
  end

  def authenticate
    if !current_user
      flash[:notice] = "Please log in"
      session[:desired_path] = request.env['PATH_INFO']
      redirect_to '/sessions/new' 
    end
  end
  
end
