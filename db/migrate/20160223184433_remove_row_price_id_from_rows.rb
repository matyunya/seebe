class RemoveRowPriceIdFromRows < ActiveRecord::Migration
  def change
    remove_column :rows, :row_price_id, :integer
  end
end
