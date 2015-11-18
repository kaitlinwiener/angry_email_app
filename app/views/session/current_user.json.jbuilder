if current_user
  json.current_user do
    json.email current_user.email
    json.id current_user.id
  end
else
  json.current_user nil
end
