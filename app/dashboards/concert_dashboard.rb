require "administrate/base_dashboard"

class ConcertDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    tickets: Field::HasMany,
    hall: Field::BelongsTo,
    id: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    band: Field::String,
    description: Field::Text,
    poster_file_name: Field::String,
    poster_content_type: Field::String,
    poster_file_size: Field::Number,
    poster_updated_at: Field::DateTime,
    date: Field::DateTime,
    user_id: Field::Number,
    time: Field::DateTime,
    age: Field::Number,
  }

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :tickets,
    :hall,
    :id,
    :created_at,
  ]

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :tickets,
    :hall,
    :band,
    :description,
    :poster_file_name,
    :poster_content_type,
    :poster_file_size,
    :poster_updated_at,
    :date,
    :user_id,
    :time,
    :age,
  ]

  # Overwrite this method to customize how concerts are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(concert)
  #   "Concert ##{concert.id}"
  # end
end
