class AddNameToCashboxes < ActiveRecord::Migration
  def change
    add_column :cashboxes, :name, :string
  end
end
