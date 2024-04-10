# This file is used by Rack-based servers to start the application.

require_relative "config/environment"
require_relative "app/lib/average_metric.rb"

run Rails.application
Rails.application.load_server
