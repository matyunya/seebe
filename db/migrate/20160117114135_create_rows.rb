class CreateRows < ActiveRecord::Migration
  def change
    create_table :rows do |t|

      t.timestamps null: false
    end
  end
end
