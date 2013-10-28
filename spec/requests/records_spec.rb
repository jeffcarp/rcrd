require 'spec_helper'

describe "Records" do

    it "loads" do
      get "/"
      response.status.should be(200)
    end

end
