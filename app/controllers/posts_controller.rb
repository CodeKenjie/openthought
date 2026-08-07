class PostsController < ApplicationController
  def index
    @post = Post.new
    @posts = Post.all
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

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.expect(post: [ :body ])
  end
end
