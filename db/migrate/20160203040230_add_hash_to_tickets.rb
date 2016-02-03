class AddHashToTickets < ActiveRecord::Migration
  def change
    remove_column :tickets, :hash, :string
  end
end
