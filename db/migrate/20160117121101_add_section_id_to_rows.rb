class AddSectionIdToRows < ActiveRecord::Migration
  def change
    add_column :rows, :section_id, :integer
    add_column :rows, :price_type, :integer
  end
end
