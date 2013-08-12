# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130810195421) do

  create_table "cats", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.boolean  "dashboard",  :default => false
    t.boolean  "day_avgs",   :default => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "color"
  end

  create_table "records", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "raw"
    t.integer  "user_id"
    t.datetime "target"
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "dashboard"
    t.string   "password_hash"
    t.string   "password_salt"
  end

end
