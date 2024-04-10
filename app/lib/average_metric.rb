class AverageMetric
	def initialize(label, cpu_temp_avg, cpu_load_avg, disk_load_avg)
		@label = label
		@cpu_temp_avg = cpu_temp_avg
		@cpu_load_avg = cpu_load_avg
		@disk_load_avg = disk_load_avg
	end

	def label
		@label
	end

	def cpu_temp_avg
		@cpu_temp_avg
	end

	def cpu_load_avg
		@cpu_load_avg
	end

	def disk_load_avg
		@disk_load_avg
	end
end