class AddCashboxIdToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :cashbox_id, :integer
  end
end
