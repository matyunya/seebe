# Ticket
class Ticket < ActiveRecord::Base
  belongs_to :concert
  belongs_to :user
  validates :section, :row, :seat, presence: true
  validates :concert_id, uniqueness: { scope: [:row, :seat] }, presence: true
end
