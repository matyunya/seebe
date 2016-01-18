class AddPricesToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :prices, :integer, array:true, default: []
  end
end
