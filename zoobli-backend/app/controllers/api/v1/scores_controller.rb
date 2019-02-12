class Api::V1::ScoresController < Api::V1::ApplicationController

    def index
        @scores = Score.all
        render json: @scores
    end

    def show
        @score = Score.find_by(params[:id])
        render json: @score
    end

    def create
        @score = Score.new(score_params)
        @score.save!
        render json: @score
    end

    private

    def score_params
        params.require(:score).permit(:image_id, :tag_id)
    end
    
end
