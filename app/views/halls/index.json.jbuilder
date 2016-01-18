json.array!(@halls) do |hall|
  json.extract! hall, :id
  json.url hall_url(hall, format: :json)
end
