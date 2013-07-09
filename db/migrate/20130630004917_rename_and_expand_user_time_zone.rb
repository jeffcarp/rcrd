class RenameAndExpandUserTimeZone < ActiveRecord::Migration
  def up
    rename_column :users, :time_zone, :dashboard
    change_column :users, :dashboard, :text
  end

  def down
    rename_column :users, :dashboard, :time_zone
    change_column :users, :time_zone, :string
  end
end
