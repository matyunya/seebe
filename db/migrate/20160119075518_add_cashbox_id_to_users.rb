class AddCashboxIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cashbox_id, :integer
  end
end
