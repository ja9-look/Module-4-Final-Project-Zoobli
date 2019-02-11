class ImageSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :user_id
end
