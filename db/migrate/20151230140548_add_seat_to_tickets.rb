class AddSeatToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :seat, :integer
  end
end
