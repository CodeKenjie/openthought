class AddTermsAcceptedToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :terms_accepted, :boolean, null: false
  end
end
