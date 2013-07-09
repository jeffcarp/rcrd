require 'spec_helper'

describe "Home" do
  describe "GET /" do
    it "loads" do
      get root_url 
      response.status.should be(200)
    end
  end
end
