class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 10.minutes, only: :create, with: -> { redirect_to new_session_path, error: "Run out of attempts. Try again later." }

  def new
  end

  def create
    if user = User.authenticate_by_login(login: params[:login], password: params[:password])
      start_new_session_for user
      redirect_to after_authentication_url
    else
      flash.now[:error] = "Incorrect username/email or password"
      render :new, locals: { login: params[:login] }, status: :unprocessable_entity
    end
  end

  def destroy
    terminate_session
    reset_session
    redirect_to new_session_path, notice: "Logged out!"
  end
end
