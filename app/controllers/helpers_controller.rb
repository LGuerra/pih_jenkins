class HelpersController < ApplicationController
  respond_to :json

  def user_info
    render nothing: true, status: 401 and return unless current_user
    groups = current_user.groups.map { |g| g.name }
    render json: {user: current_user.email, groups: groups}
  end
end
