class CreateCashboxes < ActiveRecord::Migration
  def change
    create_table :cashboxes do |t|

      t.timestamps null: false
    end
  end
end
