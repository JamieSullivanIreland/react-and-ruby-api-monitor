class ServerMetric < ApplicationRecord
    validates :cpu_temp, presence: true
    validates :cpu_load, presence: true
    validates :disk_load, presence: true
end
