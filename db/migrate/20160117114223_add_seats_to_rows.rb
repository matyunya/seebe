class AddSeatsToRows < ActiveRecord::Migration
  def change
    add_column :rows, :seats, :integer
  end
end
