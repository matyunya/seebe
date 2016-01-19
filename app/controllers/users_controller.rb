# users contoller
class UsersController < AdminController
  before_action :authenticate_user!
  before_action :authenticate_admin, :except => :show

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    return false unless current_user.admin? || @user == current_user
    redirect_to root_path, alert: 'Доступ запрещен.'
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(secure_params)
      redirect_to users_path, notice: 'Пользователь успешно обновлен.'
    else
      redirect_to users_path, alert: 'Невозможно обновить пользователя.'
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to root_path, notice: 'Пользователь удален.'
  end

  private

  def secure_params
    params.require(:user).permit(:role, :inn, :address, :name, :email, :cashbox_id)
  end

   protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
end
