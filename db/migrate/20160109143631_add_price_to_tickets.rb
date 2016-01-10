class AddPriceToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :price, :integer
  end
end
