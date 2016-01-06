ActiveRecord::Base.extend ActiveHash::Associations::ActiveRecordExtensions

# concerts
class Concert < ActiveRecord::Base
  default_scope { order('date DESC') }
  has_attached_file :poster, default_url: '/posters/missing.png'
  validates_attachment_content_type :poster, content_type: /\Aimage\/.*\Z/
  validates :band, :description, :date,
            :poster, :hall_id, :user_id, :age,
            presence: true
  has_many :tickets
  belongs_to_active_hash :hall
end
