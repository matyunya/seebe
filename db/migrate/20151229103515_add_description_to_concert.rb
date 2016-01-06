class AddDescriptionToConcert < ActiveRecord::Migration
  def change
    add_column :concerts, :description, :text
  end
end
