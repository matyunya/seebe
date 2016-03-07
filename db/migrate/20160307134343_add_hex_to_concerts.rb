class AddHexToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :hex, :string
  end
end
