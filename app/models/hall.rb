# hall
class Hall < ActiveJSON::Base
  set_root_path 'lib/assets'
  set_filename 'halls'
  include ActiveHash::Associations
  has_many :concerts
end
