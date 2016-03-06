class AddPriceToRowPrices < ActiveRecord::Migration
  def change
    add_column :row_prices, :price, :integer
    add_column :row_prices, :seat, :integer
  end
end
