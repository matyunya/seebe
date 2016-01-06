class AddRowToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :row, :integer
  end
end
