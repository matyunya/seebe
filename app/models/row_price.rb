class RowPrice < ActiveRecord::Base
    belongs_to :concert
    belongs_to :row
end
