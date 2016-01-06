class AddBandToConcert < ActiveRecord::Migration
  def change
    add_column :concerts, :band, :string
  end
end
