class StaticPagesController < ApplicationController
  def home
    @micropost = Micropost.all
  end

  def about
  end

  def menu
  end

  def forum
    if logged_in?
    @micropost = current_user.microposts.build
    @feed_items = current_user.feed.paginate(page: params[:page])
    end
  end
end
