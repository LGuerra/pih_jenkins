class PagesController < ApplicationController
  before_action :authenticate_user!, :except => [:react]
  def react 
  end
  def reporte
  end
end
