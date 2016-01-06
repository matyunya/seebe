class AddAgeToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :age, :integer
  end
end
