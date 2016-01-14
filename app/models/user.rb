class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable, :session_limitable

  # Custom fields valitations
  validates :name,      presence: true
  validates :last_name, presence: true
  validates :phone,     presence: true
  validates :area,      presence: true
  validates :puesto,    presence: true

  has_many :permissions
  has_many :groups, through: :permissions


  def in_group?(group_name)
    name = group_name.to_s
    groups.map(&:name).include? name
  end
end
