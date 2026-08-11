class RemovePostFromReplies < ActiveRecord::Migration[8.1]
  def change
    remove_reference :replies, :post, null: false, foreign_key: true
  end
end
