class AddStatusToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :status, :integer
  end
end
