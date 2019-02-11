class ImageSerializer < ActiveModel::Serializer
  attributes :id, :category, :image_url, :user_id
end
