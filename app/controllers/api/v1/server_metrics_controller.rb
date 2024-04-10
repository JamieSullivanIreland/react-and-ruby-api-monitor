require 'date'

class Api::V1::ServerMetricsController < ApplicationController
  def index
    page = params[:page] || 1
    limit = params[:limit] || 10
    order_by = params[:order_by] || 'created_at'
    sort_by = params[:sort_by] || 'desc'
    serverMetrics = ServerMetric.order(order_by => sort_by).page(page).per(limit) 
    render json: serverMetrics
  end

  def avg_per_hour
    num_hours = params[:num_hours].to_i
    avg_arr = []
    now = DateTime.current.change(:usec => 0)
    count = 1
    start_time = 0
    end_time = 0
    is_last_hour = num_hours <= 1
    limit = is_last_hour ? 60 : num_hours

    while start_time < limit
      end_time = start_time
      
      # 10 minute intervals for last hour
      # 3 hour intervals otherwise
      if is_last_hour
        start_time = count * 10
        server_metric = ServerMetric.where(:created_at => start_time.minutes.ago..end_time.minutes.ago)
        label = start_time.minutes.ago.strftime("%H:%M")
      else
        start_time = count * 3
        server_metric = ServerMetric.where(:created_at => start_time.hours.ago..end_time.hours.ago)
        label = start_time.hours.ago.strftime("%H:%M")
      end

      average_metric = AverageMetric.new(
        label, 
        server_metric.average(:cpu_temp) || 0, 
        server_metric.average(:cpu_load) || 0, 
        server_metric.average(:disk_load) || 0
      )
      avg_arr.push(average_metric)
      count = count + 1
    end

    render json: avg_arr
  end

  def avg_per_day
    count = 0
    num_days = params[:num_days].to_i
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

    render json: avg_arr
  end

  def create
    serverMetric = ServerMetric.create!(serverMetric_params)
    if serverMetric
      render json: serverMetric
    else
      render json: serverMetric.errors
    end
  end

  def show
    render json: @serverMetric
  end

  def destroy
    @serverMetric&.destroy
    render json: { message: 'Metric deleted!' }
  end

  private

  def serverMetric_params
    params.permit(:cpuTemp, :cpuLoad, :diskLoad)
  end

  def set_serverMetric
    @serverMetric = ServerMetric.find(params[:id])
  end
end
