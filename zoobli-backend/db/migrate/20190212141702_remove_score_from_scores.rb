class RemoveScoreFromScores < ActiveRecord::Migration[5.2]
  def change
    remove_column :scores, :score
  end
end
