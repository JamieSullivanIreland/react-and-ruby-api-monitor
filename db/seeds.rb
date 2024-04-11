10.times do |i|
  ServerMetric.create(
    cpu_temp: Random.rand(200),
    cpu_load: Random.rand(100),
    disk_load: Random.rand(100),
  )
end
