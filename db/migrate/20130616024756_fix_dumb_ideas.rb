class FixDumbIdeas < ActiveRecord::Migration
# Dumb ideas have been fixed.
=begin
  def change 
    drop_table :categories
    drop_table :cats
    drop_table :cats_records
    drop_table :evil_wizards
    drop_table :karmas
    drop_table :sorcerers
    drop_table :wizards
    remove_column :users, :crypted_password
    remove_column :users, :salt
    remove_column :users, :remember_me_token
    remove_column :users, :remember_me_token_expires_at
    remove_column :users, :karma
    remove_column :records, :name
  end
=end
end
