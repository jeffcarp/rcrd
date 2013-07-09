require 'spec_helper'

describe Cat do
  describe 'equalize_then_save' do

    it 'flips dashboard to true when day_avgs is also true' do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      cat = user.cats.create!(name: "swim")

      cat_now = user.cats.find_or_create_by_name "swim"
      cat_now.day_avgs = true
      cat_now.equalize_then_save
      cat_now.dashboard.should be true
    end

    it "doesn't interfere with other states" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      cat = user.cats.create!(name: "swim")

      cat_now = user.cats.find_or_create_by_name "swim"
      cat_now.dashboard = true
      cat_now.equalize_then_save
      cat_now.day_avgs.should be false 
    end

  end
end
