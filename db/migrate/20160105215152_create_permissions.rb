class CreatePermissions < ActiveRecord::Migration
  def change
    create_join_table :users, :groups, table_name: :permissions do |t|
      t.index [:user_id, :group_id]
    end
  end
end
