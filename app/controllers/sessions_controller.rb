class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      cookies.permanent.signed[:user_id] = user.id
      target_path = session[:desired_path] || root_url
      session[:desired_path] = nil
      flash[:notice] = "Logged in!"
      redirect_to target_path
    else
      flash[:notice] = "There was a problem with your email or password."
      @user = User.new
      render action: :new
    end
  end
  
  def destroy
    cookies.delete :user_id
    flash[:notice] = "Logged out"
    redirect_to root_url
  end

end
