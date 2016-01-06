# Concerts
class ConcertsController < ApplicationController
  before_action :authenticate_user!

  def index
    @halls = Hall.all
    @concerts = Concert.all
  end

  def show
    @article = Concert.find(params[:id])
  end

  def create
    @concert = Concert.create(concert_params)
    @concert.user_id = current_user.id
    if @concert.save
      redirect_to concerts_path, notice => 'Концерт был успешно добавлен.'
    else
      redirect_to concerts_path, alert => 'Ошибка при сохранении.'
    end
  end

  def destroy
    concert = Concert.find(params[:id])
    concert.destroy
    redirect_to concerts_path, notice => 'Концерт удален.'
  end

  def concert_params
    params.require(:concert).permit(
      :band, :description, :poster, :hall_id, :date, :time, :concert_id, :age)
  end
end
