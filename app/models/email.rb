class Email < ActiveRecord::Base
  validates :recipient, presence: true
  validates :body, presence: true
  validates :password, presence: true

  belongs_to :user
end
