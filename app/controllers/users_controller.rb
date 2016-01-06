# users contoller
class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :admin_only, :except => :show

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    return false unless current_user.admin? || @user == current_user
    redirect_to :back, alert => 'Доступ запрещен.'
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(secure_params)
      redirect_to users_path, notice => 'Пользователь успешно обновлен.'
    else
      redirect_to users_path, alert => 'Невозможно обновить пользователя.'
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to users_path, notice => 'Пользователь удален.'
  end

  private

  def admin_only
    return false unless current_user.admin?
    redirect_to :back, alert => 'Доступ запрещен.'
  end

  def secure_params
    params.require(:user).permit(:role)
  end
end
