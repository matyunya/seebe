class AddConcertToRowPrice < ActiveRecord::Migration
  def change
    add_column :row_prices, :concert_id, :integer
  end
end
