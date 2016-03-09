class AddHasDancefloorToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :has_dancefloor, :boolean
  end
end
