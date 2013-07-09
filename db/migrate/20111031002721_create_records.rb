class CreateRecords < ActiveRecord::Migration
  def change
   create_table :records do |t|
      t.string   :raw
      t.integer  :user_id
      t.datetime :target
      t.timestamps
    end
  end
end
