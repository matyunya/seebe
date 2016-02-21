class AddRowPriceToRow < ActiveRecord::Migration
  def change
    add_column :rows, :row_price_id, :integer
  end
end
