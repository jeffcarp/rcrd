require 'spec_helper'

describe "Sessions" do

  describe "GET /login" do
    it "loads" do
      get "/login" 
      response.status.should be(200)
    end
  end

  describe "GET /signup" do
    it "loads" do
      get "/signup" 
      response.status.should be(200)
    end
  end
end
