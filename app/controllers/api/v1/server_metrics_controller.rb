require "date"
require "dry-schema"

class Api::V1::ServerMetricsController < ApplicationController
  before_action :set_server_metric, only: %i[show destroy]

  def index
    schema = Dry::Schema.Params do
      required(:page).filled(:integer)
      required(:limit).filled(:integer, lteq?: 50)
      optional(:order_by).filled(:string)
      optional(:sort_by).filled(:string)
    end

    validation = schema.call(pagination_params.to_h)

    if validation.success?
      sort_by = params[:sort_by] || "created_at"
      order_by = params[:order_by] || "desc"
      server_metrics = ServerMetric
        .select("id, created_at, cpu_temp, cpu_load, disk_load")
        .order(sort_by => order_by)
        .page(params[:page])
        .per(params[:limit])
      render json: {
               totalItems: ServerMetric.count,
               totalPages: (ServerMetric.count.to_f / params[:limit].to_f).ceil,
               results: server_metrics,
             }, status: :ok
    else
      handle_errors(validation.errors.to_h)
    end
  end

  def avg_per_hour
    num_hours = params[:num].to_i
    avg_arr = []
    now = DateTime.current.change(:usec => 0)
    count = 0
    start_time = 0
    end_time = ""
    is_last_hour = num_hours <= 1
    limit = is_last_hour ? 60 : num_hours

    while start_time < limit
      count = count + 1
      # 10 minute intervals for last hour
      # 3 hour intervals otherwise
      if is_last_hour
        end_time = count == 1 ? now : start_time.minutes.ago
        start_time = count * 10
        server_metric = ServerMetric.where(:created_at => start_time.minutes.ago..end_time)
        label = end_time.strftime("%H:%M")
      else
        end_time = count == 1 ? now : start_time.hours.ago
        start_time = count * 4
        server_metric = ServerMetric.where(:created_at => start_time.hours.ago..end_time)
        label = end_time.strftime("%H:%M")
      end

      average_metric = AverageMetric.new(
        label,
        server_metric.average(:cpu_temp) || 0,
        server_metric.average(:cpu_load) || 0,
        server_metric.average(:disk_load) || 0
      )
      avg_arr.push(average_metric)
    end

    render json: avg_arr.reverse()
  end

  def avg_per_day
    count = 0
    num_days = params[:num].to_i
    avg_arr = []
    now = DateTime.current.change(:usec => 0)

    while count < num_days
      day_start = (now - count).in_time_zone(Time.zone).beginning_of_day
      day_end = (now - count).in_time_zone(Time.zone).end_of_day
      server_metric = ServerMetric.where(:created_at => day_start..day_end)
      average_metric = AverageMetric.new(
        day_start.strftime("%A")[0, 3],
        server_metric.average(:cpu_temp) || 0,
        server_metric.average(:cpu_load) || 0,
        server_metric.average(:disk_load) || 0
      )
      avg_arr.push(average_metric)
      count = count + 1
    end

    render json: avg_arr.reverse()
  end

  def create
    schema = Dry::Schema.Params do
      required(:cpu_temp).filled(type?: Float, lteq?: 200)
      required(:cpu_load).filled(type?: Float, lteq?: 100)
      required(:disk_load).filled(type?: Float, lteq?: 100)
    end

    validation = schema.call(server_metric_params.to_h)

    if validation.success?
      server_metric = ServerMetric.create!(server_metric_params.to_h)
      if server_metric
        render json: server_metric, status: :created
      end
    else
      handle_errors(validation.errors.to_h)
    end
  end

  def show
    render json: @server_metric
  end

  def destroy
    @server_metric&.destroy
    render json: { message: "Server metric deleted!" }, status: :ok
  end

  private

  def handle_errors(errors = nil)
    if errors
      message = ""
      errors.each do |key, value|
        puts "#{key} #{value.first}"
        message = "#{key} #{value.first}"
      end
      render json: { message: message }, status: :unprocessable_entity
    else
      render json: { message: "Something went wrong" }, status: :unprocessable_entity
    end
  end

  def server_metric_params
    params.require(:server_metric).permit(:cpu_temp, :cpu_load, :disk_load)
  end

  def pagination_params
    params.permit(:page, :limit, :order_by, :sort_by)
  end

  def set_server_metric
    @server_metric = ServerMetric.find(params[:id])
  end
end
