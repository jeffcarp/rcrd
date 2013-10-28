require 'spec_helper'

describe "Home" do

  describe "GET /" do
    it "loads" do
      get root_url 
      response.status.should be(200)
    end
  end

  describe "GET /guide" do
    it "loads" do
      get "/guide" 
      response.status.should be(200)
    end
  end

  describe "GET /stats" do
    it "loads" do
      get "/stats" 
      response.status.should be(200)
    end
  end

  describe "Log in and GET /" do
    it "loads" do

      @user = User.create!(
        email: "whatever3422@jeff.is", 
        password: "test", 
        password_confirmation: "test"
      )
      post("/sessions", {
        :email => @user.email,
        :password => @user.password})

      get "/" 
      response.status.should be(200)

      @user.destroy
    end
  end

end
