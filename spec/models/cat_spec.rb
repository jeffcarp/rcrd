require "spec_helper"

describe Cat do

  describe "search_cats" do

    it "finds exact matches" do
      user = User.create!(
        email: "whatever@jeff.is",
        password: "test",
        password_confirmation: "test",
      )
      one = user.records.create!(
        raw: "foo, bar",
        target: Time.now,
      )
      two = user.records.create!(
        raw: "bar, baz",
        target: Time.now,
      )
      expect(Cat.search_cats("bar")).to eq([two, one])
    end

  end

end
