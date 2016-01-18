json.array!(@rows) do |row|
  json.extract! row, :id
  json.url row_url(row, format: :json)
end
