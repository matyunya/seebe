class RowPricesController < AdminController
  protect_from_forgery :except => [:create]
  before_action :authenticate_promoter

  def create
    @row_price = RowPrice.create(row_price_params)
    if @row_price.save
      render :json => '{"response": "ok"}', :status => 200
    else
      render :json => '{"response": "error"}', :status => 500
    end
  end

  private

  def row_price_params
    params.require(:price).permit(
      :concert_id, :row_id, :seat, :price)
  end
end
