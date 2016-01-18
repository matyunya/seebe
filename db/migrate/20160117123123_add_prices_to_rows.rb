class AddPricesToRows < ActiveRecord::Migration
  def change
    add_column :rows, :prices, :integer, array:true, default:[]
    remove_column :rows, :price_type
  end
end
