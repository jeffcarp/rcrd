class AddDefaultStateToCatOptions < ActiveRecord::Migration
  def change
    change_column :cats, :dashboard, :boolean, default: false
    change_column :cats, :day_avgs, :boolean, default: false
  end
end
