class AddPricesToRowPrice < ActiveRecord::Migration
  def change
    add_column :row_prices, :prices, :integer, array: true, default: []
  end
end
