class AddAddressToHalls < ActiveRecord::Migration
  def change
    add_column :halls, :address, :string
  end
end
