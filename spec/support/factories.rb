FactoryBot.define do
  factory :server_metric do
    cpu_temp { 150 }
    cpu_load { 60 }
    disk_load { 35 }
  end

  # factory :average_metric do
  #   label { "Mon" }
  #   cpu_temp_avg { 150 }
  #   cpu_load_avg { 10 }
  #   disk_load_avg { 6 }
  # end

  # factory :r_average_metric, class: AverageMetric do
  #   label { "Mon" }
  #   cpu_temp_avg { 150 }
  #   cpu_load_avg { 10 }
  #   disk_load_avg { 6 }
  # end

  # factory :average_metric do
  #   label { "Generic Report" }
  #   cpu_temp_avg { 150 }
  #   cpu_load_avg { 10 }
  #   disk_load_avg { 6 }

  #   initialize_with { AverageMetric.new(attributes.merge()) }
  # end

  # factory :average_metric do
  #   transient do
  #     label { "Generic Report" }
  #     cpu_temp_avg { 150 }
  #     cpu_load_avg { 10 }
  #     disk_load_avg { 6 }
  #   end

  #   initialize_with {
  #     new(attributes.merge(

  #       label: label,
  #       cpu_temp_avg: cpu_temp_avg,
  #       cpu_load_avg: cpu_load_avg,
  #       disk_load_avg: disk_load_avg,

  #     ))
  #   }

  #   # initialize_with {
  #   #   AverageMetric.new(
  #   #     label,
  #   #     cpu_temp_avg,
  #   #     cpu_load_avg,
  #   #     disk_load_avg,
  #   #   )
  #   # }
  # end

  # factory :average_metric do
  #   ignore do
  #     label { "Generic Report" }
  #     cpu_temp_avg { 150 }
  #     cpu_load_avg { 10 }
  #     disk_load_avg { 6 }
  #   end

  #   initialize_with {
  #     AverageMetric.new(
  #       label,
  #       cpu_temp_avg,
  #       cpu_load_avg,
  #       disk_load_avg,
  #     )
  #   }

  #   # transient do
  #   #   label { "Mon" }
  #   #   cpu_temp_avg { 120 }
  #   #   cpu_load_avg { 50 }
  #   #   disk_load_avg { 5 }
  #   # end

  #   # initialize_with {
  #   #   new(label: label,
  #   #       cpu_temp_avg: cpu_temp_avg,
  #   #       cpu_load_avg: cpu_load_avg,
  #   #       disk_load_avg: disk_load_avg)
  #   # }

  #   # AverageMetric.new(
  #   #   label: label,
  #   #   cpu_temp_avg: cpu_temp_avg,
  #   #   cpu_load_avg: cpu_load_avg,
  #   #   disk_load_avg: disk_load_avg,
  #   # )

  #   # # initialize_with {
  #   #   new(attributes.merge(
  #   #     label: label,
  #   #     cpu_temp_avg: cpu_temp_avg,
  #   #     cpu_load_avg: cpu_load_avg,
  #   #     disk_load_avg: disk_load_avg,
  #   #   ))
  #   # }
  # end
end
