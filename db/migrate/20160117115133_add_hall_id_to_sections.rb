class AddHallIdToSections < ActiveRecord::Migration
  def change
    add_column :sections, :hall_id, :integer
  end
end
