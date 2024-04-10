require 'date'

class Api::V1::ServerMetricsController < ApplicationController
  def index
    serverMetrics = ServerMetric.all.order(created_at: :desc)
    render json: serverMetrics
  end

  def average
    # serverMetrics = ServerMetric.all.order(created_at: :desc)
    # averageCpuTemp = ServerMetric.average(:cpu_load, :group => "DATE(created_at)", :conditions => ["created_at >", "2024-04-09T16:40:59.180Z"])
    # averageCpuTemp = ServerMetric.average(:cpu_load, :group => "created_at")
    # averageCpuTemp = ServerMetric.maximum(:cpu_load, :group => 'created_at')

    # today = Date.today

    # start_date = params[:start]

    # start_date = DateTime.parse(params[:start])
    
    # DateTime.parse("2012-7-31 09:38:00.000000").to_i
    
    # new_date = DateTime.new(start_date)
    
    # day = ServerMetric.where('date(created_at) = ?', start_date)
    # new_date = DateTime.parse(start_date).to_s
    
    
    # start_date = DateTime.parse(params[:start])
    # now = Time.now

    # puts 'start_date'
    # puts start_date
    # puts 'now'
    # puts now




    # ninety_days_ago = (now - 90)
    # day_start = (now - 7).in_time_zone(Time.zone).beginning_of_day



    # day_end = (start_date - 7).in_time_zone(Time.zone).end_of_day

    # hours_diff = ((now - start_date) / 1.hour)
    
    # puts 'HOURS DIFF'
    # puts hours_diff
    
    # day_start = (Date.today - hours_diff)


    # puts 'NOW'
    # puts now

    # puts '1.hours.from_now'
    # puts 1.hours.from_now
    # puts '5.hours.ago'
    # puts 5.hours.ago

    # start = (now - start_date)

    # puts 'START'
    # puts start

    # puts 'START PARSED'
    # DateTime.parse(start).to_i
    # puts now
    


    # puts today.days_since(7)

    # averageCpuTemp = ServerMetric.calculate(:average, :cpu_load)
    # averageCpuTemp = ServerMetric.pluck(Arel.sql('DATEDIFF(updated_at, created_at)'))

    # averageCpuTemp = ServerMetric.where(id: 3)
    # .average('TIME_TO_SEC(TIMEDIFF(updated_at, created_at))')
    # .to_f



    # render json: day_end
    # render json: ServerMetric.average(:cpu_load)
    # render json: ServerMetric.where('created_at > ?', start_date).average(:cpu_load)
    # render json: ServerMetric.average(:cpu_load)

    # s = Time.parse(1.hours.from_now)
    # e = Time.parse(5.hours.ago)

    # puts '1.hours.from_now INT'
    # puts s
    # puts '5.hours.ago INT'
    # puts e

    start_date = DateTime.parse(params[:start])
    puts 'start_date'
    puts start_date

    now = DateTime.current.change(:usec => 0)
    puts 'now'
    puts now
    render json: ServerMetric.where(:created_at => start_date..now).average(:cpu_load)
    # render json: ServerMetric.where(:created_at => start_date..now)
    # render json: ServerMetric.where(:created_at => now.beginning_of_day..now)


    # render json: start
    # render json: ServerMetric.where(:created_at => now..start_date).average(:cpu_load)
    # render json: ServerMetric.where(:created_at => s..e)
    # render json: DateTime.parse(params[:start]).to_i
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
