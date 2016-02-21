class CreateRowPrices < ActiveRecord::Migration
  def change
    create_table :row_prices do |t|

      t.timestamps null: false
    end
  end
end
