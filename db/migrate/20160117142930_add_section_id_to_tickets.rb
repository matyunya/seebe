class AddSectionIdToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :section_id, :integer
    remove_column :tickets, :section
  end
end
