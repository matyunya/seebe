class AddConcertIdToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :concert_id, :integer
  end
end
