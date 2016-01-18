class Section < ActiveRecord::Base
    belongs_to :hall
    has_many :rows
end
