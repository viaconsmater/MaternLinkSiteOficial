require "rails_helper"

RSpec.describe "UpdateAppointmentPaymentStatusJob", type: :job do
  describe "#perform" do
    include ActiveJob::TestHelper
    include ActiveSupport::Testing::TimeHelpers

    let(:doctor) { create(:user_doctor) }

    before { create(:doctor_availability, doctor: doctor.doctor) }

    context "when the appointment is created" do
      it "enqueue the jobs" do
        expect do
          create(:appointment, doctor: doctor.doctor)
        end.to have_enqueued_job(UpdateAppointmentPaymentStatusJob).at_least(1)
      end
    end

    context "when the time limit for payment is reached and is still pending" do
      it "updates the status to cancelled" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :scheduled,
          payment_status: :pending,
        )
        travel_to(20.minutes.from_now) do
          perform_enqueued_jobs do
            UpdateAppointmentPaymentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("cancelled")
          expect(appointment.payment_status).to eq("payment_cancelled")
        end
      end
    end

    context "when the time limit for payment is reached and payment is processing" do
      it "does not update the status to cancelled" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :scheduled,
          payment_status: :processing,
        )
        travel_to(20.minutes.from_now) do
          perform_enqueued_jobs do
            UpdateAppointmentPaymentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("scheduled")
          expect(appointment.payment_status).to eq("processing")
        end
      end
    end

    context "when the time limit for payment is reached and payment is paid" do
      it "does not update the status to cancelled" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :scheduled,
          payment_status: :paid,
        )
        travel_to(20.minutes.from_now) do
          perform_enqueued_jobs do
            UpdateAppointmentPaymentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("scheduled")
          expect(appointment.payment_status).to eq("paid")
        end
      end
    end
  end
end
