require 'open-uri'

class ApiController < ApplicationController
  before_action :authenticate_user!

  def tunnel_request
    @accessor ||= ApiHelper::Accessor.instance
    response, status = @accessor.get(
      request.env['ORIGINAL_FULLPATH'],
      current_user
    )
    render :json => response, status: status
  end
  def tunnel_request_cloud
    @accessor ||= ApiHelper::Accessor.instance
    response, status = @accessor.cloud(
      request.env['ORIGINAL_FULLPATH'],
      current_user
    )
    render :json => response, status: status
  end
  def tunnel_request_post 
    @accessor ||= ApiHelper::Accessor.instance
    response, status = @accessor.post(
      request.env['ORIGINAL_FULLPATH'],
      request.params[:api],
      request,
      current_user
    )
    render :json => response, status: status
  end
end
