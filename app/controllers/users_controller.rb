class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  before_action :set_user, only: %i[ update ]
  before_action :authenticate_owner, only: %i[ update ]

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      start_new_session_for(@user)
      redirect_to root_path, notice: "Account successfully created!"
    else
      flash.now[:error] = @user.errors.full_messages.join(", ")
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      redirect_to @user, notice: "Updated information successfully"
    else
      flash.now[:error] = @user.errors.full_messages.join(", ")
      render :show, status: :unprocessable_entity
    end
  end

  private

  def authenticate_owner
    unless @user == current_user
      redirect_to @user, error: "You are not authenticated to do that!"
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.expect(user: [ :first_name, :last_name, :date_of_birth, :email, :username, :password, :password_confirmation, :terms_accepted ])
  end
end
