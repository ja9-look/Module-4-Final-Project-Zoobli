class User < ApplicationRecord
    has_many :images
    has_secure_password
end
