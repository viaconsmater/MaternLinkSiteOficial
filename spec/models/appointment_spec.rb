require "rails_helper"

RSpec.describe Appointment, type: :model do
  let(:doctor) { create(:doctor) }

  before { create(:doctor_availability, doctor: doctor) }

  describe "validations" do
    context "when all attributes are valid" do
      it { expect(build(:appointment, doctor: doctor, date: 6.hours.from_now)).to be_valid }
    end

    context "with no date" do
      it { expect(build(:appointment, doctor: doctor, date: nil)).to be_invalid }
    end

    context "with no duration" do
      it { expect(build(:appointment, doctor: doctor, duration: nil, date: 6.hours.from_now)).to be_valid }
    end

    context "with no status" do
      it { expect(build(:appointment, doctor: doctor, status: nil, date: 6.hours.from_now)).to be_invalid }
    end

    context "with no price_cents" do
      it { expect(build(:appointment, doctor: doctor, price_cents: nil, date: 6.hours.from_now)).to be_invalid }
    end

    context "with no patient" do
      it { expect(build(:appointment, doctor: doctor, patient: nil, date: 6.hours.from_now)).to be_invalid }
    end

    context "with no doctor" do
      it { expect(build(:appointment, doctor: nil, date: 6.hours.from_now)).to be_invalid }
    end

    context "with no clinic" do
      it { expect(build(:appointment, doctor: doctor, clinic: nil, date: 6.hours.from_now)).to be_invalid }
    end

    context "with already existing external_payment_id" do
      before { create(:appointment, doctor: doctor, date: 6.hours.from_now, external_payment_id: "123456") }

      it {
        expect(build(
          :appointment,
          doctor: doctor,
          date: 2.hours.from_now,
          external_payment_id: "123456",
        )).to be_invalid
      }
    end

    context "with time in the past" do
      it { expect(build(:appointment, doctor: doctor, date: 1.hour.ago)).to be_invalid }
    end

    context "with time too close to now" do
      it { expect(build(:appointment, doctor: doctor, date: 2.hours.from_now)).to be_invalid }
    end
  end

  describe "notifications" do
    context "when the appointment is done" do
      before do
        ActiveJob::Base.queue_adapter = :test
      end

      it "sends an email to the clinic" do
        appointment = create(:appointment, doctor: doctor, date: 6.hours.from_now, status: :scheduled)
        expect do
          appointment.success!
        end.to have_enqueued_job(ActionMailer::MailDeliveryJob)
          .with("AppointmentMailer", "confirmation_to_clinic", "deliver_now", Hash)
      end

      it "sends an email to the patient" do
        appointment = create(:appointment, doctor: doctor, date: 6.hours.from_now, status: :scheduled)
        expect do
          appointment.success!
        end.to have_enqueued_job(ActionMailer::MailDeliveryJob)
          .with("AppointmentMailer", "confirmation_to_patient", "deliver_now", Hash)
      end
    end
  end

  describe "overlaping appointments" do
    context "when the doctor already has an appointment at the time" do
      before do
        create(:appointment, doctor: doctor, date: 5.hours.from_now)
      end

      it "does not create a new appointment" do
        doctor.reload
        expect(build(:appointment, doctor: doctor, date: 5.hours.from_now)).to be_invalid
      end
    end

    context "when there are two appointments one followed by the other" do
      before do
        create(:appointment, doctor: doctor, date: 5.hours.from_now)
        create(:appointment, doctor: doctor, date: 6.hours.from_now)
      end

      it "creates a new appointment" do
        doctor.reload
        expect(build(:appointment, doctor: doctor, date: 5.hours.from_now + 30.minutes)).to be_valid
      end
    end
  end
end
