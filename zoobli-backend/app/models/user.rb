class User < ApplicationRecord
    has_many :images
    has_secure_password
    validates :username, uniqueness: { case_sensitive: false }
end
