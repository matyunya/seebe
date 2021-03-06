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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160501100256) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cashboxes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  create_table "concerts", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "band"
    t.text     "description"
    t.string   "poster_file_name"
    t.string   "poster_content_type"
    t.integer  "poster_file_size"
    t.datetime "poster_updated_at"
    t.integer  "hall_id"
    t.date     "date"
    t.integer  "user_id"
    t.time     "time"
    t.integer  "age"
    t.integer  "status"
    t.integer  "prices",              default: [],                 array: true
    t.boolean  "archive",             default: false
    t.string   "hex"
    t.integer  "dancefloor_price"
    t.integer  "dancefloor_limit"
    t.boolean  "has_dancefloor"
  end

  create_table "halls", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "price_types"
    t.string   "name"
    t.integer  "sections",    default: [],              array: true
    t.string   "address"
  end

  create_table "row_prices", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "row_id"
    t.integer  "concert_id"
    t.integer  "price"
    t.integer  "seat"
    t.string   "hex"
  end

  create_table "rows", force: :cascade do |t|
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "seats"
    t.integer  "section_id"
    t.integer  "prices",     default: [],              array: true
    t.integer  "number"
  end

  create_table "sections", force: :cascade do |t|
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "name"
    t.integer  "hall_id"
    t.integer  "rows",       default: [],              array: true
    t.boolean  "dancefloor"
    t.integer  "price_type"
  end

  create_table "tickets", force: :cascade do |t|
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "concert_id"
    t.integer  "row"
    t.integer  "seat"
    t.integer  "user_id"
    t.integer  "price",                           null: false
    t.integer  "section_id"
    t.boolean  "transfer",        default: false
    t.integer  "cashbox_id"
    t.boolean  "return"
    t.integer  "return_amount",   default: 0
    t.float    "discount_amount"
    t.string   "discount_reason"
    t.string   "url_hash"
    t.string   "email"
    t.boolean  "check_in",        default: false
    t.integer  "row_id"
    t.boolean  "dancefloor"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.integer  "role"
    t.string   "inn"
    t.string   "address"
    t.integer  "cashbox_id"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
