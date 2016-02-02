class Cashbox < ActiveRecord::Base
  has_many :users
  has_many :tickets

  def total
    return main_total if self.id == 0

    @total = 0
    tickets = self.tickets
    tickets.map { |t| 
      @total += t.price - t.return_amount unless t.transfer == true
    }
    return @total
  end

  def main_total
    @total = 0
    tickets = Ticket.where(:transfer => true)
    tickets.map {|t| 
      @total += t.price - t.return_amount
    }
    return @total
  end
end