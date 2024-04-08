class CreateServerMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :server_metrics do |t|
      t.float :cpuTemp, null: false
      t.float :cpuLoad, null: false
      t.float :diskLoad, null: false

      t.timestamps
    end
  end
end
