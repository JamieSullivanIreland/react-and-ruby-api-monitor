class ServerMetric < ApplicationRecord
    validates :cpuTemp, presence: true
    validates :cpuLoad, presence: true
    validates :diskLoad, presence: true
end
