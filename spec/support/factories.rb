FactoryBot.define do |i|
  factory :server_metric do
    id { i }
    cpu_temp { Random.rand(200) }
    cpu_load { Random.rand(100) }
    disk_load { Random.rand(100) }
    created_at { "2024-04-14T15:20:20.506Z" }
    updated_at { "2024-04-14T15:20:20.506Z" }
  end
end
