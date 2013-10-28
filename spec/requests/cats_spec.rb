require 'spec_helper'

describe "Cats" do

  before(:all) do 
    @user = User.create!(
      email: "whatever4322@jeff.is", 
      password: "test", 
      password_confirmation: "test"
    )
    @record = @user.records.create!(
      raw: "workout, swim, 3200 yards", 
      target: Time.now
    )
    post("/sessions", {
      :email => @user.email,
      :password => @user.password})
  end

  it "GET /cats/:name" do
    get "/cats/swim"
    expect(response.status).to eq(200)
  end

  it "GET /cats/new then GET /cats/:name/edit" do
    get "/cats/new?name=swim"
    expect(response.status).to eq(302)
    get "/cats/swim/edit"
    expect(response.status).to eq(200)
  end

  after(:all) do 
    @record.destroy
    @user.destroy 
  end

end
