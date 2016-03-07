class AddRowIdToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :row_id, :integer
  end
end
