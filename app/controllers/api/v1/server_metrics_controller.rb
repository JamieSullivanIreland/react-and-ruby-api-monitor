class Api::V1::ServerMetricsController < ApplicationController
  def index
    serverMetrics = ServerMetric.all.order(created_at: :desc)
    render json: serverMetrics
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
