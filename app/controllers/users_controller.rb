class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path, notice: "Account successfully created!"
    else
      flash.now[:error] = @user.errors.full_messages.join(", ")
      render :new, status: :unprocessable_entity
    end
  end

  def check_username
  end

  private

  def user_params
    params.expect(user: [ :first_name, :last_name, :email, :username, :password, :password_confirmation, :terms_accepted ])
  end
end
