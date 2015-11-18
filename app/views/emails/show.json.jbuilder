json.id @email.id
json.recipient @email.recipient
json.body @email.body
json.password @email.password
json.created_at time_ago_in_words(@email.created_at) + " ago"
json.user_id @email.user_id
