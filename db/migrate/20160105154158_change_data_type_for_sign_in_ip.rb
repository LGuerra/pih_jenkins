class ChangeDataTypeForSignInIp < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.change :current_sign_in_ip, :string
      t.change :last_sign_in_ip,    :string
    end
  end
  def self.down
    change_table :users do |t|
      t.change :current_sign_in_ip, :inet
      t.change :last_sign_in_ip,    :inet
    end
  end
end
