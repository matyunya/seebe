class RemovePricesFromRowPrices < ActiveRecord::Migration
  def change
    remove_column :sections, :rows, :integer, array: true
  end
end
