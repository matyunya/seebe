# tickets
class TicketsController < AdminController
  def index
    @tickets = Ticket.all if current_user.admin?
    @tickets = Ticket.where user_id: current_user.id if current_user.seller?
  end

  def new
    @concert = Concert.find(params[:concert])
    @hall = @concert.hall
  end

  def create
    @ticket = Ticket.create(ticket_params)
    @ticket.user_id = current_user.id
    @ticket.cashbox_id = current_user.cashbox_id
    if @ticket.save
      print(@ticket)
    else
      redirect_to tickets_path, alert: 'Ошибка при сохранении'
    end
  end

  def destroy
    @ticket = Ticket.find(params[:id])
    if @ticket.destroy
      redirect_to tickets_path, notice: 'Билет удален'
    else
      redirect_to tickets_path, alert: 'Билет не был удален'
    end
  end

  def show
    @ticket = Ticket.find_by(:url_hash => params[:id])
  end

  def return
    @ticket = Ticket.find(params[:id])
    return_amount = @ticket.cashback
    if return_amount
      redirect_to tickets_path, notice: "Оформлен возврат на сумму #{return_amount} р."
    else
      redirect_to tickets_path, alert: 'Возврат не был оформлен'
    end
  end

  def sections_as_json
    @json = ''
    @concert.hall.sections.each_with_index do |hall, index|
      @json += {index: hall}.to_json
    end
  end

  def tickets_as_json
    Ticket.where(concert_id: @concert.id).pluck(:row, :seat).to_json
  end

  def prices_as_json
    @concert.prices
  end

  helper_method :sections_as_json
  helper_method :tickets_as_json
  helper_method :prices_as_json

  private

  def print(ticket)
    Prawn::Document.generate("#{Rails.root}/public/hello.pdf", 
      {:page_size => [424, 1200], :page_layout => :landscape}) do
      font("#{Rails.root}/app/assets/fonts/OpenSansCondensedLight.ttf")
      column_box([0, cursor], :columns => 3, :width => bounds.width - 200) do
        age = "#{Rails.root}/app/assets/images/age/#{ticket.concert.age}.png"
        image age, :at => [900,-50], :scale => 1.3
        text "артист: #{ticket.concert.band}\n
              площадка: #{ticket.concert.hall.name}\n
              дата: #{ticket.concert.date}\n\n\n\n\n\n\n
              место: #{ticket.section.name} #{ticket.row} ряд #{ticket.seat} место\n
              цена: #{ticket.price}\n
              кассир: #{ticket.user.name}\n
              орг: #{ticket.concert.user.name}\n\n\n\n\n\n
              инн: #{ticket.concert.user.inn}\n
              адрес: #{ticket.concert.user.address}", :size => 24
        end
    end
    
    send_file(
      "#{Rails.root}/public/hello.pdf",
      filename: "#{ticket.concert.band} #{ticket.seat}:#{ticket.row}.pdf",
      type: "application/pdf"
    )
  end

  protected

  def ticket_params
    params.require(:ticket).permit(
      :section_id, :row, :seat, :hall_id, :concert_id, :discount_reason, :discount_amount)
  end
end
