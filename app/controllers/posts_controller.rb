class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  def index
    @post = Post.new
    @posts = Post.includes(:user).order(created_at: :desc)
  end

  def show
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to root_path
    else
      flash.now[:error] = @post.errors.full_messages.join(", ")
      render :index, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      redirect_to @post, notice: "Updated post successfully"
    else
      flash.now[:error] = @post.errors.full_messages.join(", ")
      render :show, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, notice: "post successfully deleted"
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.expect(post: [ :body ])
  end
end
