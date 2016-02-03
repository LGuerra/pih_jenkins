class PagesController < ApplicationController
  before_action :authenticate_user!, except: [:condiciones]
  def index
  end
  def reporte
  end
  def condiciones
  end
end
