class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :name
      t.integer :user_id
      t.boolean :dashboard
      t.boolean :day_avgs

      t.timestamps
    end
  end
end
