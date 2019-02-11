class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :image_id, :tag_id, :score
end
