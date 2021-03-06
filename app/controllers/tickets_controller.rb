# tickets
class TicketsController < AdminController
  before_action :authenticate_user!, :except => :show
  def index
    @tickets = Ticket.all if current_user.admin?
    @tickets = Ticket.where user_id: current_user.id if current_user.seller?

    if current_user.promoter?
      concert_ids = Concert.where user_id: current_user.id
      @tickets = Ticket.where concert_id: concert_ids
    end
  end

  def new
    @concert = Concert.find(params[:concert])
    @hall = @concert.hall
  end

  def create
    @ticket = Ticket.create(ticket_params)
    @ticket.user_id = current_user.id
    @ticket.cashbox_id = current_user.cashbox_id
    logger.debug "#{@ticket} #{ticket_params}"
    if @ticket.save
      TicketMailer.ticket_email(@ticket).deliver_now unless @ticket.email == ''
      redirect_to ticket_url(@ticket.url_hash), notice: "Билет продан за #{@ticket.price} руб."
    else
      redirect_to tickets_path, alert: 'Ошибка при сохранении'
    end
  end

  def check_in
    logger.info params
    @ticket = Ticket.find_by(:url_hash => params[:hash], :concert_id => Concert.where(:user_id => current_user.id))
    return redirect_to tickets_path, alert: 'Билет не найден либо вы не промоутер' if @ticket.nil?

    return redirect_to tickets_path, alert: 'По этому билету уже прошли' if @ticket.check_in == true

    @ticket.check_in = true
    if @ticket.save
      redirect_to tickets_path, notice: 'Человек зашел на концерт'
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
    @concert.hall.sections.reverse.each_with_index do |hall, index|
      @json += {index: hall}.to_json
    end
  end

  def tickets_as_json
    Ticket.where(concert_id: @concert.id).pluck(:row, :seat, :section_id)
  end

  def row_prices_as_json
    RowPrice.select(:row_id, :seat, :price).where(concert_id: @concert.id)
  end

  helper_method :sections_as_json
  helper_method :tickets_as_json
  helper_method :row_prices_as_json

  protected

  def ticket_params
    params.require(:ticket).permit(
      :section_id, :row, :seat, :hall_id, :concert_id, :dancefloor,
      :discount_reason, :discount_amount, :email, :row_id)
  end
end
