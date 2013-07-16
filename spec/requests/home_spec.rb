require 'spec_helper'

describe "Home" do

  describe "GET root_url" do
    it "loads" do
      get root_url 
      response.status.should be(200)
    end
  end

  describe "GET /guide (guide_path)" do
    it "loads" do
      get guide_path 
      response.status.should be(200)
    end
  end
end
