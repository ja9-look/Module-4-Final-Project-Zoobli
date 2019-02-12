class Api::V1::TagsController < Api::V1::ApplicationController

    def index
        @tags = Tag.all
        render json: @tags
    end

    def create
        @tag = Tag.new(tag_params)
        @tag.save!
        render json: @tag
    end

    private

    def tag_params
        params.require(:tag).permit(:name)
    end

end
