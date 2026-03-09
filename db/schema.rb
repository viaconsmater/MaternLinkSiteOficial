# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_15_011530) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "cep"
    t.string "neighborhood"
    t.string "city"
    t.string "state"
    t.string "street"
    t.string "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
  end

  create_table "appointments", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "doctor_id", null: false
    t.datetime "date"
    t.integer "duration"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "clinic_id"
    t.integer "price_cents"
    t.text "aditional_info"
    t.string "external_payment_id"
    t.string "external_clinic_payment_id"
    t.integer "payment_status", default: 0
    t.integer "transfer_status", default: 0
    t.integer "transfer_value_cents"
    t.integer "payment_method"
    t.index ["clinic_id"], name: "index_appointments_on_clinic_id"
    t.index ["doctor_id"], name: "index_appointments_on_doctor_id"
    t.index ["external_clinic_payment_id"], name: "index_appointments_on_external_clinic_payment_id", unique: true
    t.index ["external_payment_id"], name: "index_appointments_on_external_payment_id", unique: true
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
  end

  create_table "budget_items", force: :cascade do |t|
    t.bigint "clinic_id", null: false
    t.bigint "budget_id", null: false
    t.text "description"
    t.integer "status", default: 0
    t.decimal "amount", precision: 10, scale: 2
    t.datetime "paid_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "additional_description"
    t.bigint "payment_id"
    t.index ["budget_id"], name: "index_budget_items_on_budget_id"
    t.index ["clinic_id"], name: "index_budget_items_on_clinic_id"
    t.index ["payment_id"], name: "index_budget_items_on_payment_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "clinic_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "clinic_id", null: false
    t.boolean "is_owner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clinic_id"], name: "index_clinic_users_on_clinic_id"
    t.index ["user_id"], name: "index_clinic_users_on_user_id"
  end

  create_table "clinics", force: :cascade do |t|
    t.string "name"
    t.string "cnpj"
    t.text "description"
    t.bigint "address_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "external_payment_id"
    t.string "pix_key"
    t.integer "pix_type", default: 0
    t.integer "operation_fee", default: 1000
    t.boolean "active", default: true
    t.boolean "exam_enabled", default: false, null: false
    t.index ["address_id"], name: "index_clinics_on_address_id"
  end

  create_table "clinics_work_specialties", id: false, force: :cascade do |t|
    t.bigint "clinic_id", null: false
    t.bigint "work_specialty_id", null: false
    t.index ["clinic_id", "work_specialty_id"], name: "idx_on_clinic_id_work_specialty_id_9b74c9987c"
    t.index ["work_specialty_id", "clinic_id"], name: "idx_on_work_specialty_id_clinic_id_9df1ba2fea"
  end

  create_table "contacting_users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "credit_cards", force: :cascade do |t|
    t.string "credit_card_brand"
    t.string "credit_card_number"
    t.string "credit_card_token"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_credit_cards_on_user_id"
  end

  create_table "doctor_availabilities", force: :cascade do |t|
    t.bigint "doctor_id", null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "day_of_week"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_doctor_availabilities_on_doctor_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "council"
    t.bigint "work_area_id", null: false
    t.bigint "work_specialty_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "professional_experiences", default: [], array: true
    t.string "educational_history", default: [], array: true
    t.integer "price_cents"
    t.index ["user_id"], name: "index_doctors_on_user_id"
    t.index ["work_area_id"], name: "index_doctors_on_work_area_id"
    t.index ["work_specialty_id"], name: "index_doctors_on_work_specialty_id"
  end

  create_table "good_job_batches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.jsonb "serialized_properties"
    t.text "on_finish"
    t.text "on_success"
    t.text "on_discard"
    t.text "callback_queue_name"
    t.integer "callback_priority"
    t.datetime "enqueued_at"
    t.datetime "discarded_at"
    t.datetime "finished_at"
  end

  create_table "good_job_executions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id", null: false
    t.text "job_class"
    t.text "queue_name"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "finished_at"
    t.text "error"
    t.integer "error_event", limit: 2
    t.text "error_backtrace", array: true
    t.uuid "process_id"
    t.interval "duration"
    t.index ["active_job_id", "created_at"], name: "index_good_job_executions_on_active_job_id_and_created_at"
    t.index ["process_id", "created_at"], name: "index_good_job_executions_on_process_id_and_created_at"
  end

  create_table "good_job_processes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "state"
    t.integer "lock_type", limit: 2
  end

  create_table "good_job_settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "key"
    t.jsonb "value"
    t.index ["key"], name: "index_good_job_settings_on_key", unique: true
  end

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id"
    t.text "concurrency_key"
    t.text "cron_key"
    t.uuid "retried_good_job_id"
    t.datetime "cron_at"
    t.uuid "batch_id"
    t.uuid "batch_callback_id"
    t.boolean "is_discrete"
    t.integer "executions_count"
    t.text "job_class"
    t.integer "error_event", limit: 2
    t.text "labels", array: true
    t.uuid "locked_by_id"
    t.datetime "locked_at"
    t.index ["active_job_id", "created_at"], name: "index_good_jobs_on_active_job_id_and_created_at"
    t.index ["batch_callback_id"], name: "index_good_jobs_on_batch_callback_id", where: "(batch_callback_id IS NOT NULL)"
    t.index ["batch_id"], name: "index_good_jobs_on_batch_id", where: "(batch_id IS NOT NULL)"
    t.index ["concurrency_key"], name: "index_good_jobs_on_concurrency_key_when_unfinished", where: "(finished_at IS NULL)"
    t.index ["cron_key", "created_at"], name: "index_good_jobs_on_cron_key_and_created_at_cond", where: "(cron_key IS NOT NULL)"
    t.index ["cron_key", "cron_at"], name: "index_good_jobs_on_cron_key_and_cron_at_cond", unique: true, where: "(cron_key IS NOT NULL)"
    t.index ["finished_at"], name: "index_good_jobs_jobs_on_finished_at", where: "((retried_good_job_id IS NULL) AND (finished_at IS NOT NULL))"
    t.index ["labels"], name: "index_good_jobs_on_labels", where: "(labels IS NOT NULL)", using: :gin
    t.index ["locked_by_id"], name: "index_good_jobs_on_locked_by_id", where: "(locked_by_id IS NOT NULL)"
    t.index ["priority", "created_at"], name: "index_good_job_jobs_for_candidate_lookup", where: "(finished_at IS NULL)"
    t.index ["priority", "created_at"], name: "index_good_jobs_jobs_on_priority_created_at_when_unfinished", order: { priority: "DESC NULLS LAST" }, where: "(finished_at IS NULL)"
    t.index ["priority", "scheduled_at"], name: "index_good_jobs_on_priority_scheduled_at_unfinished_unlocked", where: "((finished_at IS NULL) AND (locked_by_id IS NULL))"
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
  end

  create_table "inbound_webhooks", force: :cascade do |t|
    t.string "status", default: "pending"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "password_reset_tokens", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_password_reset_tokens_on_user_id"
  end

  create_table "patients", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_patients_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "status"
    t.integer "payment_method"
    t.integer "transfer_status"
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.string "payable_type", null: false
    t.bigint "payable_id", null: false
    t.bigint "user_id", null: false
    t.datetime "paid_at"
    t.string "transaction_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "transaction_receipt_url"
    t.index ["payable_type", "payable_id"], name: "index_payments_on_payable"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating", null: false
    t.text "description"
    t.string "reviewable_type", null: false
    t.bigint "reviewable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reviewable_type", "reviewable_id"], name: "index_reviews_on_reviewable"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "user_agent"
    t.string "ip_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "user_media", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "media_url"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_media_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "name"
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone"
    t.string "cpf"
    t.integer "gender"
    t.date "birthdate"
    t.bigint "address_id"
    t.string "external_payment_id"
    t.boolean "enabled", default: true
    t.string "wallet_id"
    t.boolean "split_enabled"
    t.index ["address_id"], name: "index_users_on_address_id"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "work_areas", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nick_name"
    t.index ["name"], name: "index_work_areas_on_name", unique: true
  end

  create_table "work_specialties", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "work_area_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_exam", default: false, null: false
    t.index ["work_area_id"], name: "index_work_specialties_on_work_area_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "appointments", "clinics"
  add_foreign_key "appointments", "doctors"
  add_foreign_key "appointments", "patients"
  add_foreign_key "budget_items", "budgets"
  add_foreign_key "budget_items", "clinics"
  add_foreign_key "budget_items", "payments"
  add_foreign_key "budgets", "users"
  add_foreign_key "clinic_users", "clinics"
  add_foreign_key "clinic_users", "users"
  add_foreign_key "clinics", "addresses"
  add_foreign_key "credit_cards", "users"
  add_foreign_key "doctor_availabilities", "doctors"
  add_foreign_key "doctors", "users"
  add_foreign_key "doctors", "work_areas"
  add_foreign_key "doctors", "work_specialties"
  add_foreign_key "password_reset_tokens", "users"
  add_foreign_key "patients", "users"
  add_foreign_key "payments", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "user_media", "users"
  add_foreign_key "users", "addresses"
  add_foreign_key "work_specialties", "work_areas"
end
