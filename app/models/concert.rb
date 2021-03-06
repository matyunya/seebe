# concerts
class Concert < ActiveRecord::Base
  CREATED   = 1
  MODERATED = 2
  COMPLETED = 3

  STATUSES = {
    CREATED   => 'created',
    MODERATED => 'moderated',
    COMPLETED => 'completed'
  }

  after_initialize :default_values
  default_scope { order('updated_at DESC') }
  has_attached_file :poster, default_url: '/posters/missing.png'
  validates_attachment_content_type :poster, content_type: /\Aimage\/.*\Z/
  validates :band, :description, :date,
            :poster, :hall_id, :user_id, :age,
            presence: true
  has_many :tickets
  has_many :row_prices
  belongs_to :user
  belongs_to :hall
  after_create :update_row_prices
  after_update :update_row_prices

  def update_row_prices
    RowPrice.where(hex: self.hex).update_all(concert_id: self.id)
  end

  validates_inclusion_of :status, :in => STATUSES.keys,
    :message => "{{value}} must be in #{STATUSES.values.join ','}"

  def moderated!
    self.status = MODERATED
  end

  private

  def default_values
    self.status ||= CREATED
  end
end
