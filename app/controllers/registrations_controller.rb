class RegistrationsController < Devise::RegistrationsController
  before_filter :update_sanitized_params, if: :devise_controller?

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) << :name
    devise_parameter_sanitizer.for(:account_update) {
        |u| u.permit(:email, :password, :password_confirmation, :current_password, :name, :inn, :address) 
    }
  end

end
