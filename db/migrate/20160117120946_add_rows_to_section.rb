class AddRowsToSection < ActiveRecord::Migration
  def change
    add_column :sections, :rows, :integer, array:true, default: []
  end
end
