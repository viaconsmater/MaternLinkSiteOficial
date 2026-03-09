require "rails_helper"

RSpec.describe "UpdateAppointmentStatusJob", type: :job do
  describe "#perform" do
    include ActiveJob::TestHelper
    include ActiveSupport::Testing::TimeHelpers

    let(:doctor) { create(:user_doctor) }

    before { create(:doctor_availability, doctor: doctor.doctor) }

    context "when the appointment is created" do
      it "enqueue the jobs" do
        expect do
          create(:appointment, doctor: doctor.doctor)
        end.to have_enqueued_job(UpdateAppointmentStatusJob).at_least(2)
      end
    end

    context "when the appointemnt reaches the start time" do
      it "updates the status to ongoing" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :scheduled,
        )
        travel_to(3.hours.from_now + 1.minute) do
          perform_enqueued_jobs do
            UpdateAppointmentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("ongoing")
        end
      end
    end

    context "when the appointemnt reaches the end time" do
      it "updates the status to ongoing" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :scheduled,
        )
        travel_to(3.hours.from_now + 31.minutes) do
          perform_enqueued_jobs do
            UpdateAppointmentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("completed")
        end
      end
    end

    context "when the appointemnt reaches the start time but it was cancelled" do
      it "updates the status to ongoing" do
        appointment = create(
          :appointment,
          doctor: doctor.doctor,
          date: 3.hours.from_now,
          status: :cancelled,
        )
        travel_to(3.hours.from_now + 1.minute) do
          perform_enqueued_jobs do
            UpdateAppointmentStatusJob.perform_now(appointment.id)
          end
          appointment.reload
          expect(appointment.status).to eq("cancelled")
        end
      end
    end
  end
end
