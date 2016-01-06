class AddHallIdToConcert < ActiveRecord::Migration
  def change
    add_column :concerts, :hall_id, :integer
  end
end
