class Image < ApplicationRecord
    belongs_to :user
    has_many :scores
    has_many :tags, through: :scores
end
