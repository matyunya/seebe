class AddCheckInToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :check_in, :boolean, default: false
  end
end
