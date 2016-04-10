class MakePriceNotNullable < ActiveRecord::Migration[5.0]
  def change
    change_column :tickets, :price, :integer, :null => false
  end
end
