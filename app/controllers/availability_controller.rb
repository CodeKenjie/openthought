class AvailabilityController < ApplicationController
  allow_unauthenticated_access only: %i[ username email ]
  def username
    render json: {
      available: !User.exists?(username: params[:username])
    }
  end

  def email
    render json: {
      available: !User.exists?(email: params[:email])
    }
  end
end
