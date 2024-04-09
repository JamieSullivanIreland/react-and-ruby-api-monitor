class CreateServerMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :server_metrics do |t|
      t.float :cpu_temp, null: false
      t.float :cpu_load, null: false
      t.float :disk_load, null: false

      t.timestamps
    end
  end
end
