class AddTransferToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :transfer, :boolean, default: false
  end
end
