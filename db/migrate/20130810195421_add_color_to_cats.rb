class AddColorToCats < ActiveRecord::Migration
  def change
    add_column :cats, :color, :string
  end
end
