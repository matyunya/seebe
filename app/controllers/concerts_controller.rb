# Concerts
class ConcertsController < AdminController
  def index
    @halls = Hall.all
    @concerts = Concert.all.where(:archive => false)
  end

  def show
    @concert = Concert.find(params[:id])
  end

  def new
    authenticate_promoter
    @hex = SecureRandom.hex
    unless check_promoter_fields?
      redirect_to '/users/edit', alert: 'Заполните ваше имя, ИНН и и юридический адрес'
    end
  end

  def edit
    authenticate_promoter
    @concert = Concert.find(params[:id])
  end

  def update
    @concert = Concert.find(params[:id])
    respond_to do |format|
      if @concert.update(concert_params)
        format.html { redirect_to @concert, notice: 'Концерт был успешно обновлен' }
        format.json { render :show, status: :ok, location: @concert }
      else
        format.html { render :edit }
        format.json { render json: @concert.errors, status: :unprocessable_entity }
      end
    end
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
    concert.archive = true
    concert.save
    redirect_to concerts_path, notice: 'Концерт перемещен в архив.'
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

  def sections_as_json
    @json = ''
    Section.all.each_with_index do |section, index|
        @json += {index: section}.to_json
    end
  end

  def row_prices_as_json
    RowPrice.where(concert_id: @concert.id)
  end

  def tickets_as_json
    Ticket.where(concert_id: @concert.id).pluck(:row, :seat)
  end

  helper_method :sections_as_json
  helper_method :tickets_as_json
  helper_method :row_prices_as_json

  helper_method :halls_as_json

  private

  def check_promoter_fields?
    current_user.inn.present? && current_user.name.present? && current_user.address.present?
  end

  def concert_params
    params.require(:concert).permit(
      :band, :description, :poster, :hall_id, 
      :date, :time, :concert_id, :age, :has_dancefloor, :hex,
      :dancefloor_limit, :dancefloor_price, :prices => [])
  end
end
