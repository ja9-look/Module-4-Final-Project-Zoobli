class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :image_id
      t.integer :tag_id
      t.integer :score

      t.timestamps
    end
  end
end
