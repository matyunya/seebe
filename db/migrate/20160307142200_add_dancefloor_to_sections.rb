class AddDancefloorToSections < ActiveRecord::Migration
  def change
    add_column :sections, :dancefloor, :boolean
  end
end
