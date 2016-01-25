require 'open-uri'
require 'net/http'
require 'net/https'
require 'singleton'
require 'uri'

module ApiHelper
  class Accessor
    include Singleton

    def initialize
      @api_root = ENV['API_V1_ADDRESS']
    end

    def post url, params, request
      urlp = URI.parse("#{@api_root}#{url}")
      begin
        http = Net::HTTP.new(urlp.host, urlp.port)
        http.use_ssl = true
        req = Net::HTTP::Post.new(urlp.path)
        req.body = request.raw_post
        req['Content-Type'] = request.headers['Content-Type']
        resp = http.request(req)
        puts resp.body
        [resp.body, resp.code]
      rescue => e
        puts e
        puts e.backtrace
        e
      end
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
