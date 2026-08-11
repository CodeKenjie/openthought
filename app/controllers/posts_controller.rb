class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  before_action :set_comment, only: %i[ show ]
  before_action :authorized_owner, only: %i[ update destroy ]

  def index
    @post = Post.new
    @posts = Post.includes(:user, comments: :user).order(created_at: :desc)
  end

  def show
    @comments = @post.comments.includes(:user, replies: :user).order(created_at: :desc)
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

  def authorized_owner
    unless @post.user == current_user
      redirect_to @post, error: "You are not authorize to that!"
    end
  end

  def set_comment
    @comment = @post.comments.build
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.expect(post: [ :body ])
  end
end
