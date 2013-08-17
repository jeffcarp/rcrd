require "spec_helper"

describe User do

  before(:each) do
    @user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test") 
  end

  describe "highest_use_cats" do
    @user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test") 
    @user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
    @user.records.create!(raw: "workout, run, miles", target: Time.now)

    workout = @user.cats.where('name = ?', 'workout')

    expect(@user.highest_use_cats).to include(workout)
  end

  describe "self.authenticate" do
    it "works when a user exists" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      expect(User.authenticate("whatever@jeff.is", "test")).to eq(user)
    end
    it "works when a user does not exist" do
      expect(User.authenticate("whatever@jeff.is", "test")).to eq(nil)
    end
  end

  describe "encrypt_password" do
    it "encrypts before save" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      user.password_hash.should_not eq(hash)
    end
  end

  describe "current_time_zone" do

    it "defaults to Pacific Time" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      expect(user.current_time_zone).to eq(ActiveSupport::TimeZone.new("Pacific Time (US & Canada)"))
    end

    it "is correct under normal conditions" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      tz = user.records.create!(raw: "time zone, Tokyo", target: Time.now - 5.minutes)
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      expect(user.current_time_zone).to eq(ActiveSupport::TimeZone.new("Tokyo"))
    end

  end

  describe "default_time_zone" do
  end

  describe "get_trending_cats" do
    it "is correct under normal conditions" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim", target: Time.now)
      two = user.records.create!(raw: "restaurant", target: Time.now)
      expect(user.get_trending_cats).to include("workout")
      expect(user.get_trending_cats).to include("restaurant")
    end
  end

  describe "get_list_of_cat_frequencies" do
  end

  describe "binary_cat_existence" do
    it "is correct under normal conditions" do
=begin      
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim", target: Time.now - 2.days)
      two = user.records.create!(raw: "swim, lake", target: Time.now)

      expected = {}
      expected[Time.now.strftime('%F').to_s] = true

      expect(user.binary_cat_existence(3, 'swim')).to eq()
=end
    end
  end

end
