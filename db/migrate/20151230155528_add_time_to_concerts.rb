class AddTimeToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :time, :time
  end
end
