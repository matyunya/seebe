class TicketMailer < ApplicationMailer
  default from: 'noreply@seebee.ru'

  def ticket_email(ticket)
    return if ticket.email == nil

    @ticket = ticket
    mail(to: @ticket.email, subject: "Билет: #{@ticket.concert.band} #{@ticket.row} #{@ticket.seat} #{@ticket.concert.date}")
  end
end
