class Api::V1::ImagesController < Api::V1::ApplicationController

    def index
        @images = Image.all
        render json: @images
    end
    
    def show
        @image = Image.find_by(params[:id])
        render json: @image
    end

    def create
        @image = Image.new(image_params)
        @image.save!
        render json: @image
    end

    private

    def image_params
        params.require(:image).permit(:image_url, :user_id)
    end

end
