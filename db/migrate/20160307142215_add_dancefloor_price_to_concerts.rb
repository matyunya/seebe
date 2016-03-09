class AddDancefloorPriceToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :dancefloor_price, :integer
  end
end
