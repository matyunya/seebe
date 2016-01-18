class AddSectionsToHalls < ActiveRecord::Migration
  def change
    add_column :halls, :sections, :integer, array:true, default: []
  end
end
