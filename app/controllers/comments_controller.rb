class CommentsController < ApplicationController
  before_action :set_post, only: %i[ show create update destroy ]
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :authorized_owner, only: %i[ update destroy ]

  def show
  end

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @post
    else
      render "posts/show", status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      redirect_to @post
    else
      render "posts/show", status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    redirect_to @post
  end

  private

  def authorized_owner
    unless @comment.user == current_user
      redirect_to @post, error: "You are not authorized to do that!"
    end
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.expect(comment: [ :body ])
  end
end
