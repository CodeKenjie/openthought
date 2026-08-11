class RepliesController < ApplicationController
  before_action :set_post, only: %i[ create update destroy ]
  before_action :set_comment, only: %i[ create update destroy ]
  before_action :set_reply, only: %i[ update destroy ]
  before_action :authorized_owner, only: %i[ update destroy ]

  def create
    @reply = @comment.replies.build(reply_params)
    @reply.user = current_user

    if @reply.save
      redirect_to @post, notice: "You successfully created a reply"
    else
      redirect_to @post, error: @reply.errors.full_messages.join(", ")
    end
  end

  def update
  end

  def destroy
  end

  private

  def authorized_owner
    unless @reply.user == current_user
      redirect_to @post, error: "You are not authorized to do that"
    end
  end

  def set_reply
    @reply = @comment.replies.find(params[:id])
  end

  def set_comment
    @comment = @post.comments.find(params[:comment_id])
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  def reply_params
    params.expect(reply: [ :body ])
  end
end
