require "rails_helper"

RSpec.describe Clinic, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      clinic = build(:clinic)
      expect(clinic).to be_valid
    end

    it "is invalid without an address" do
      clinic = build(:clinic, address: nil)
      expect(clinic).to be_invalid
    end
  end

  describe "operation_fee_to_f" do
    it "returns the correct value" do
      clinic = build(:clinic, operation_fee: 1000)
      expect(clinic.operation_fee_to_f).to eq(0.1)
    end
  end

  describe "deactivate clinic" do
    let(:clinic) { create(:clinic) }
    let(:user) { create(:user) }

    before do
      create(:clinic_user, clinic: clinic, user: user, is_owner: true)
    end

    it "disables all users when clinic is deactivated" do
      clinic.update!(active: false)
      expect(user.reload.enabled).to be(false)
    end
  end

  describe "monthly income" do
    let(:clinic) { create(:clinic) }
    let(:doctor) { create(:doctor) }

    before do
      7.times do |n|
        create(:doctor_availability, doctor: doctor, day_of_week: n)
      end
      # valid
      create(
        :appointment,
        price_cents: 10000,
        date: 3.hours.from_now,
        clinic: clinic,
        status: :completed,
        doctor: doctor,
      )
      # valid
      create(
        :appointment,
        price_cents: 20000,
        date: 4.hours.from_now,
        clinic: clinic,
        status: :completed,
        doctor: doctor,
      )
      # invalid
      build(:appointment, price_cents: 10000, date: 1.month.ago, clinic: clinic, status: :completed, doctor: doctor)
      # invalid
      build(
        :appointment,
        price_cents: 20000,
        date: 5.hours.from_now,
        clinic: clinic,
        status: :scheduled,
        doctor: doctor,
      )
    end

    it "is only counting valid appointments" do
      expect(clinic.monthly_income(Time.zone.now.month, Time.zone.now.year)).to eq(30000)
    end
  end

  describe "monthly appointments" do
    let(:clinic) { create(:clinic) }
    let(:doctor) { create(:doctor) }

    before do
      7.times do |n|
        create(:doctor_availability, doctor: doctor, day_of_week: n)
      end
      # valid
      create(
        :appointment,
        price_cents: 10000,
        date: 3.hours.from_now,
        clinic: clinic,
        status: :completed,
        doctor: doctor,
      )
      # valid
      create(
        :appointment,
        price_cents: 20000,
        date: 4.hours.from_now,
        clinic: clinic,
        status: :completed,
        doctor: doctor,
      )
      # invalid
      build(:appointment, price_cents: 10000, date: 1.month.ago, clinic: clinic, status: :completed, doctor: doctor)
      # invalid
      build(
        :appointment,
        price_cents: 20000,
        date: 5.hours.from_now,
        clinic: clinic,
        status: :scheduled,
        doctor: doctor,
      )
    end

    it "is only counting valid appointments" do
      expect(clinic.monthly_appointments(Time.zone.now.month, Time.zone.now.year)).to eq(2)
    end
  end

  describe "monthly new_patients" do
    let(:clinic) { create(:clinic) }
    let(:doctor) { create(:doctor) }
    let(:patient1) { create(:patient) }
    let(:patient2) { create(:patient) }
    let(:patient3) { create(:patient) }

    before do
      7.times do |n|
        create(:doctor_availability, doctor: doctor, day_of_week: n)
      end

      # invalid
      build(
        :appointment,
        price_cents: 10000,
        date: 1.month.ago,
        clinic: clinic,
        status: :completed,
        patient: patient1,
        doctor: doctor,
      )
      # invalid
      build(
        :appointment,
        price_cents: 10000,
        date: 3.hours.from_now,
        clinic: clinic,
        status: :completed,
        patient: patient1,
        doctor: doctor,
      )
      # valid
      create(
        :appointment,
        price_cents: 20000,
        date: 3.hours.from_now,
        clinic: clinic,
        status: :completed,
        patient: patient2,
        doctor: doctor,
      )
      # invalid
      build(
        :appointment,
        price_cents: 2000,
        date: 3.hours.from_now,
        clinic: clinic,
        status: :scheduled,
        patient: patient3,
        doctor: doctor,
      )
    end

    it "is only counting valid appointments" do
      expect(clinic.monthly_new_patients(Time.zone.now.month, Time.zone.now.year)).to eq(1)
    end
  end
end
