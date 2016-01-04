class HealthCheckController < ApplicationController
  respond_to :json

  def index
    render json: 'OK', status: 200
  end
end
