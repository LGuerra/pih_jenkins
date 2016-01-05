class Group < ActiveRecord::Base
  validates :name, presence: true

  has_many :permissions
  has_many :user, through: :permissions
end
