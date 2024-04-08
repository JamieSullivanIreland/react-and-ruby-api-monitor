
100.times do |i|
    ServerMetric.create(
      cpuTemp: Random.rand(150),
      cpuLoad: Random.rand(100), 
      diskLoad: Random.rand(100) 
    )
  end