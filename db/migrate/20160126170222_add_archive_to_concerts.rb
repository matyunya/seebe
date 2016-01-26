class AddArchiveToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :archive, :boolean, default: false
  end
end
