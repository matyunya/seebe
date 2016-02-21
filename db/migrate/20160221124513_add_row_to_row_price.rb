class AddRowToRowPrice < ActiveRecord::Migration
  def change
    add_column :row_prices, :row_id, :integer
  end
end
