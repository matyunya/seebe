class CreateHalls < ActiveRecord::Migration
  def change
    create_table :halls do |t|

      t.timestamps null: false
    end
  end
end
