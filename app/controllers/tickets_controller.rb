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
      print
      redirect_to tickets_path, notice: 'Билет продан.'
    else
      redirect_to tickets_path, alert: 'Ошибка при сохранении.'
    end
  end

  def destroy
    @ticket = Ticket.find(params[:id])
    if @ticket.destroy
      redirect_to tickets_path, notice: 'Билет удален.'
    end
      redirect_to tickets_path, alert: 'Билет не был удален'
  end

  def sections_as_json
    @json = ''
    @concert.hall.sections.each_with_index do |hall, index|
      @json += {index: hall}.to_json
    end
  end

  def tickets_as_json
    @json = ''
    Ticket.where(concert_id: @concert.id).pluck(:row, :seat).to_json
  end

  helper_method :sections_as_json
  helper_method :tickets_as_json

  private

  def print
    Prawn::Document.generate("hello.pdf") do
      text "Hello World!"
    end
  end

  protected

  def ticket_params
    params.require(:ticket).permit(
      :section, :row, :seat, :hall_id, :concert_id)
  end
end
