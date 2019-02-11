class Tag < ApplicationRecord
    has_many :scores
    has_many :images, through: :scores
    has_one :description
end
