# devise user
class User < ActiveRecord::Base
  enum role: [:user, :seller, :admin, :promoter, :cashier]
  after_initialize :set_default_role, :if => :new_record?
  has_many :tickets
  belongs_to :cashbox

  def set_default_role
    self.role ||= :user
  end

  def promoter?
    self.role == 'promoter'
  end

  def seller?
    self.role == 'seller'
  end

  def admin?
    self.role == 'admin'
  end

  def cashier?
    self.role == 'cashier'
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
