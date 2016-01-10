# Concerts
class AdminController < ApplicationController
  before_action :authenticate_user!

  def authenticate_admin
    redirect_to_back unless current_user.admin?
  end

  def authenticate_seller
    redirect_to_back unless current_user.seller?
  end

  def authenticate_promoter
    redirect_to_back unless current_user.promoter?
  end

  def redirect_to_back(message: 'Доступ запрещен')
    redirect_to :back, :alert => message
  rescue ActionController::RedirectBackError
    redirect_to root_path, :alert => message
  end

  helper_method :authenticate_admin
  helper_method :authenticate_seller
  helper_method :authenticate_promoter
end
