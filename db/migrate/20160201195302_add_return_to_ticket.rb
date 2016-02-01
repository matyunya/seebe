class AddReturnToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :return, :boolean
  end
end
