# Concerts
class ConcertsController < AdminController

  def index
    @halls = Hall.all
    @concerts = Concert.all
  end

  def show
    @article = Concert.find(params[:id])
  end

  def new
    authenticate_promoter
  end

  def create
    @concert = Concert.create(concert_params)
    @concert.user_id = current_user.id
    if @concert.save
      redirect_to concerts_path, notice: 'Концерт был успешно добавлен.'
    else
      redirect_to concerts_path, alert: 'Ошибка при сохранении.'
    end
  end

  def destroy
    concert = Concert.find(params[:id])
    concert.destroy
    redirect_to concerts_path, notice: 'Концерт удален.'
  end

  def set_moderated
    concert = Concert.find(params[:id])
    concert.moderated!
    concert.save
    redirect_to concerts_path, notice: 'Концерт отмодерирован.'
  end

  def halls_as_json
    @json = ''
    Hall.all.each_with_index do |hall, index|
      @json += {index: hall}.to_json
    end
  end

  helper_method :halls_as_json

  private
  def concert_params
    params.require(:concert).permit(
      :band, :description, :poster, :hall_id, :date, :time, :concert_id, :age)
  end
end
