class Api::V1::DescriptionsController < Api::V1::ApplicationController

    def index
        @descriptions = Description.all
        render json: @descriptions
    end

    def create
        @description = Description.new(description_params)
        @description.save!
        render json: @description
    end

    private

    def description_params
        params.require(:description).permit(:content, :tag_id)
    end

end
