class AddReturnAmountToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :return_amount, :integer
  end
end
