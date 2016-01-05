# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'set'

group_names     = Set.new Group.all.map(&:name)
required_groups = Set.new ['general', 'prueba']
missing_groups  = required_groups.difference(group_names)

missing_groups.each do |group_name|
  Group.create(name: group_name)
end

testuser = User.new(email: "testuser@intelimetrica.com", password: "password",
                    password_confirmation: "password", area: "QA", puesto: "test",
                    name: "John", last_name: "Doe", phone: "123123123")
testuser.group_ids = [1,2]
testuser.save
