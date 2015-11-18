class AddUserReferencetoEmail < ActiveRecord::Migration
  def change
    add_reference :emails, :user, index: true, foreign_key: true
  end
end
