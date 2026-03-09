class ReviewsController < ApplicationController
  def new
    render inertia: "Rating/Index"
  end

  def create
    review = Review.new(review_params)

    return redirect_to new_review_url, inertia: { errors: review.errors } unless review.save

    redirect_to root_path, inertia: { success: "Avaliação realizada com sucesso" }
  end

  private

  def review_params
    params.permit(:rating, :description, :reviewable_id, :reviewable_type)
  end
end
