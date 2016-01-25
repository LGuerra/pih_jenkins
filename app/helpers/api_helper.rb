require 'open-uri'
require 'net/http'
require 'singleton'

module ApiHelper
  class Accessor
    include Singleton

    def initialize
      @api_root = ENV['API_V1_ADDRESS']
    end

    def post url, params
    end

    def get url
      attempts = 0
      begin
         open("#{@api_root}#{url}") do |response|
          response.set_encoding('UTF-8')
          [response.read, response.status[0]]
        end
      rescue OpenURI::HTTPError => error
        response = error.io
        if response.status[0] == "401"
          attempts += 1
          retry if attempts < 3
          sleep(2 ** attempts)
        else
          [response.string, response.status[0]]
        end
      end
    end
  end
end
