class UsersController < ApplicationController
  def update
    @user = current_user
    @user.update!(@user.doctor? ? user_params : user_params.except(:doctor_attributes))

    if current_user.owns_clinic?
      @clinic = Clinic.find(params[:clinic_attributes][:id])
      @clinic.update!(clinic_params[:clinic_attributes])
    end

    redirect_to profiles_path
  rescue StandardError => e
    redirect_to profiles_path, inertia: { errors: e }
  end

  def attach_image
    @user = current_user
    @user.image.attach(params[:image])
    @user.save!(validate: false)
    redirect_to profiles_path
  rescue StandardError => e
    redirect_to profiles_path, inertia: { errors: e }
  end

  def upload
    @user = User.find(params[:id])
  
    if params[:images].present?
      params[:images].each do |media|
        user_media = @user.user_media.create!
  
        user_media.media_urls.attach(media)
      end

      redirect_to profiles_path
    end
  end

  def remove_image
    @user_media = UserMedia.find(params[:id]) 
    @user = @user_media.user 
  
    if @user_media.media_urls.attached?
      @user_media.media_urls.purge 
    end
    @user_media.destroy
    redirect_to profiles_path 
  end
  
  def upload_multiple_images
    @user = current_user
    @user.image.attach(params[:image])
    @user.save!(validate: false)
    redirect_to profiles_path
  rescue StandardError => e
    redirect_to profiles_path, inertia: { errors: e }
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :phone,
      :role,
      :cpf,
      :gender,
      :birthdate,
      :user_media,
      address_attributes: [
        :cep,
        :city,
        :state,
        :street,
        :number,
        :neighborhood,
        :latitude,
        :longitude
      ],
      doctor_attributes: [
        :id,
        :council,
        :description,
        :price_cents,
        :work_area_id,
        :work_specialty_id,
        professional_experiences: [],
        educational_history: [],
      ],
    )
  end

  def clinic_params
    params.permit(
      clinic_attributes: [
        :name,
        :cnpj,
        :description,
        :pix_key,
        :pix_type,
        :exam_enabled,
        work_specialty_ids: []
      ],
    )
  end
end
