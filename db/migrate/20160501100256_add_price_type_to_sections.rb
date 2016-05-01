class AddPriceTypeToSections < ActiveRecord::Migration[5.0]
  def change
    add_column :sections, :price_type, :integer
  end
end
