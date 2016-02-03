class AddUrlHashToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :url_hash, :string
  end
end
