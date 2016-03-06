class RemovePricesFromRowPrices < ActiveRecord::Migration
  def change
    remove_column :row_prices, :prices, :integer
  end
end
