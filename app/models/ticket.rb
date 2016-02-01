# Ticket
class Ticket < ActiveRecord::Base
  belongs_to :concert
  belongs_to :user
  belongs_to :section
  belongs_to :cashbox
  validates :section_id, :row, :seat, presence: true
  validates :concert_id, uniqueness: { scope: [:row, :seat] }, presence: true

  before_save(on: :create) do
    price_type = Row.find_by(section_id: self.section_id, number: self.row).prices[self.seat]
    self.price = Concert.find(self.concert_id).prices[price_type]
    unless self.discount_amount == nil
      self.discount_amount *= 0.1
      self.price -= (self.price*self.discount_amount)
    end
  end

  def cashback
    self.return = true
    concert_date = self.concert.date
    puts "concert date: #{concert_date}"
    if concert_date > 2.weeks.from_now
      return_amount_rate = 0.8
    elsif concert_date < 2.weeks.from_now && concert_date > 1.week.from_now
      return_amount_rate = 0.7
    elsif concert_date < 1.weeks.from_now && concert_date > 3.days.from_now
      return_amount_rate = 0.5
    else return_amount_rate = 0
    end

    self.return_amount = return_amount_rate * self.price
    self.return = true
    return self.return_amount if self.save
  end
end
