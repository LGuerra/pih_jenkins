class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable, :session_limitable

  # Custom fields valitations
  validates :name,      presence: true
  validates :last_name, presence: true
  validates :phone,     presence: true
  validates :area,      presence: true
  validates :puesto,    presence: true

end
