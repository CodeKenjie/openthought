class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy

  before_validation :normalize_attributes

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, on: :create
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :password_confirmation, presence: true, on: :create
  validates :terms_accepted, acceptance: true, on: :create

  def self.authenticate_by_login(login:, password:)
    user = find_by(email: login) || find_by(username: login)
    user&.authenticate(password)
  end

  private

  def normalize_attributes
    email&.strip!
    email&.downcase!
    username&.strip!
  end
end
