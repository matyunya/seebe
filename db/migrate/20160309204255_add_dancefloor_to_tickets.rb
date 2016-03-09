class AddDancefloorToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :dancefloor, :bool
  end
end
