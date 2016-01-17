class AddParamsToUser < ActiveRecord::Migration
  def change
    add_column :users, :inn, :integer
    add_column :users, :address, :string
  end
end
