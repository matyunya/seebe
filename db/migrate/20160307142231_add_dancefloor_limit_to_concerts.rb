class AddDancefloorLimitToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :dancefloor_limit, :integer
  end
end
