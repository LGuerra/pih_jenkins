require 'open-uri'

class ApiController < ApplicationController

  def tunnel_request
    @accessor ||= ApiHelper::Accessor.instance
    response, status = @accessor.get(
      request.env['ORIGINAL_FULLPATH']
    )
    render :json => response, status: status
  end
  def tunnel_request_post 
    @accessor ||= ApiHelper::Accessor.instance
    response, status = @accessor.post(
      request.env['ORIGINAL_FULLPATH'],
      request.params[:api]
    )
    render :json => response, status: status

  end
end
