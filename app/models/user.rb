class User < ApplicationRecord
  has_secure_password

  before_validation :normalize_attributes

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :password_confirmation, presence: true, on: :create
  validates :terms_accepted, acceptance: true

  private

  def normalize_attributes
    email&.strip!
    email&.downcase!
    username&.strip!
    username&.downcase!
  end
end
