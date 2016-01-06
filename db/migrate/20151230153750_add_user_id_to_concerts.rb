class AddUserIdToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :user_id, :integer
  end
end
