class AddHexToRowPrices < ActiveRecord::Migration
  def change
    add_column :row_prices, :hex, :string
  end
end
