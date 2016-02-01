class AddDiscountAmountToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :discount_amount, :float
  end
end
