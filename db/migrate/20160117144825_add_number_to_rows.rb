class AddNumberToRows < ActiveRecord::Migration
  def change
    add_column :rows, :number, :integer
  end
end
