require 'spec_helper'

describe "Records" do

  before(:all) do 
    @user = User.create!(
      email: "whatever4672@jeff.is", 
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

  it "GET /records/new" do
    get "/records/new"
    expect(response.status).to eq(200)
  end

  it "GET /records/:id" do
    get "/records/"+@record.id.to_s
    expect(response.status).to eq(200)
  end

  after(:all) do 
    @record.destroy
    @user.destroy 
  end

end
