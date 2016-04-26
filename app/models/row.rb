class Row < ActiveRecord::Base
    belongs_to :section
    has_one :rowPrice
    default_scope { order('number DESC') }
end
