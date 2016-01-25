json.array!(@cashboxes) do |cashbox|
  json.extract! cashbox, :id
  json.url cashbox_url(cashbox, format: :json)
end
