class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :recipient, null: false
      t.string :body, null: false
      t.string :password, null: false

      t.timestamps null: false
    end
  end
end
