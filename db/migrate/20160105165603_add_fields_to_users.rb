class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name,              :string, default: "", null: false
    add_column :users, :last_name,         :string, default: "", null: false
    add_column :users, :phone,             :string, default: "", null: false
    add_column :users, :area,              :string, default: "", null: false
    add_column :users, :puesto,            :string, default: "", null: false
    add_column :users, :unique_session_id, :string, limit: 20
  end
end
