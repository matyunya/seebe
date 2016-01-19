# Ticket
class Ticket < ActiveRecord::Base
  belongs_to :concert
  belongs_to :user
  belongs_to :section
  validates :section_id, :row, :seat, presence: true
  validates :concert_id, uniqueness: { scope: [:row, :seat] }, presence: true

  before_save(on: :create) do
    price_type = Row.find_by(section_id: self.section_id, number: self.row).prices[self.seat]
    self.price = Concert.find(self.concert_id).prices[price_type]
  end
end
