class AddSectionToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :section, :string
  end
end
