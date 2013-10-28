require 'spec_helper'

describe "Users" do

  before(:all) do 
    @user = User.create!(
      email: "whatever4676@jeff.is", 
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

  it "GET /settings" do
    get "/settings"
    expect(response.status).to eq(200)
  end

  after(:all) do 
    @record.destroy
    @user.destroy 
  end

end
