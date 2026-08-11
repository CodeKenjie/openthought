class CreateReplies < ActiveRecord::Migration[8.1]
  def change
    create_table :replies do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.references :comment, null: false, foreign_key: true
      t.string :body

      t.timestamps
    end
  end
end
