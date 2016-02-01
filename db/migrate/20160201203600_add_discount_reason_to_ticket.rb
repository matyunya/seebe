class AddDiscountReasonToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :discount_reason, :string
  end
end
