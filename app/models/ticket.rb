# Ticket
class Ticket < ActiveRecord::Base
  belongs_to :concert
  belongs_to :user
  belongs_to :section
  belongs_to :cashbox
  validates :section_id, :row, :seat, presence: true, unless: :dancefloor?
  validates :concert_id, uniqueness: { scope: [:row, :seat] }, presence: true, unless: :dancefloor?
  default_scope {order('created_at DESC')}
  before_save :prepare, :if => :new_record?

  def prepare
    self.url_hash = SecureRandom.uuid
    self.price = self.dancefloor? ? dancefloor_price : set_price
    self.section_id = self.dancefloor ? Section.find_by(hall_id: self.concert.hall.id, dancefloor: true).id : self.section_id
    set_discount
  end

  def dancefloor_price
    self.price = self.dancefloor ? concert.dancefloor_price : self.concert.prices[self.section.price_type]
  end

  def dancefloor?
    self.dancefloor || !self.section.price_type.nil?
  end

  def set_discount
    unless self.discount_amount == nil
      self.discount_amount *= 0.01
      self.price -= (self.price*self.discount_amount)
    end
  end

  def qrcode
    path = Rails.application.routes.url_helpers.check_path(self.url_hash)
    qrcode = RQRCode::QRCode.new("https://seebee.herokuapp.com#{path}")
    qrcode.as_svg(offset: 0, color: '000', 
                    shape_rendering: 'crispEdges', 
                    module_size: 2)
  end

  def russian_id
    id = self.id.to_s.rjust(6, '0')
    "AA #{id}"
  end

  def age
    "https://s3.eu-central-1.amazonaws.com/seebe/age/#{self.concert.age}.png"
  end

  def cashback
    self.return = true
    concert_date = self.concert.date
    puts "concert date: #{concert_date}"
    if self.created_at > 2.hours.ago
      return_amount_rate = 1
    elsif concert_date < 2.weeks.from_now && concert_date > 1.week.from_now
      return_amount_rate = 0.7
    elsif concert_date < 1.weeks.from_now && concert_date > 3.days.from_now
      return_amount_rate = 0.5
    elsif concert_date > 2.weeks.from_now
      return_amount_rate = 0.8
    else return_amount_rate = 0
    end

    self.return_amount = return_amount_rate * self.price
    self.return = true
    return self.return_amount if self.save
  end

  def set_price
    price_type = Row.find_by(section_id: self.section_id, number: self.row).prices[self.seat-1]
    regular_price = self.concert.prices[price_type]
    row_price = RowPrice.where(row_id: self.row_id, seat: self.seat, hex: self.concert.hex).first;
    self.price = row_price.nil? ? regular_price : row_price.price
  end
end
