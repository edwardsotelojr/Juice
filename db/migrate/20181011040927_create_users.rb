class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.text :name
      t.string :password_digest
      t.integer :phone, :limit => 8
      t.integer :zipcode
      t.text :address
      t.boolean :donator
      t.integer :juicecount
      t.integer :weekcount

      t.timestamps
    end
  end
end
