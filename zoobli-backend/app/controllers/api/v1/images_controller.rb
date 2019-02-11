class Api::V1::ImagesController < ApplicationController

    def index
        @images = Image.all
        render json: @images
    end
    
    def show
        @image = Image.find_by(params[:id])
        render json: @image
    end

    def create
        @image = Image.new(image_url: params[:image_url], user_id: params[:user_id])
        @image.save
        render json: @image
    end

end
