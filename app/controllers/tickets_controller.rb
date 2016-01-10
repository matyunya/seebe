# tickets
class TicketsController < AdminController
  before_action :authenticate_seller || :authenticate_admin

  def index
    @tickets = Ticket.all if current_user.admin?
    @tickets = Ticket.find_by user_id: current_user.id if current_user.seller?
    @tickets = Ticket.all
  end

  def new
    @concert = Concert.find(params[:concert])
    @hall = @concert.hall
  end

  def create
    @ticket = Ticket.create(ticket_params)
    @ticket.user_id = current_user.id
    if @ticket.save
      redirect_to tickets_path, notice: 'Билет продан.'
    else
      redirect_to tickets_path, alert: 'Ошибка.'
    end
  end

  def destroy
    ticket = Ticket.find(params[:id])
    ticket.destroy
    redirect_to tickets_path, notice => 'Билет удален.'
  end

  def ticket_params
    params.require(:ticket).permit(
      :section, :row, :seat, :hall_id, :concert_id)
  end
end
