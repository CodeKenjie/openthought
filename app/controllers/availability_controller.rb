class AvailabilityController < ApplicationController
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
