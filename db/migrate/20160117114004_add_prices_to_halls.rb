class AddPricesToHalls < ActiveRecord::Migration
  def change
    add_column :halls, :price_types, :integer
    add_column :halls, :name, :string
  end
end
