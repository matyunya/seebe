class Row < ActiveRecord::Base
    belongs_to :section
    default_scope { order('number ASC') }
end
