require "rails_helper"

RSpec.describe "GET Paginated Server Metrics", type: :request do
  describe "GET /index" do
    before do
      FactoryBot.create_list(:server_metric, 55)
      get "/api/v1/server_metrics/index?order_by=desc&sort_by=created_at&page=1&limit=10"
    end

    it "returns 10 results" do
      expect(json["results"].size).to eq(10)
    end

    it "returns 50 total items" do
      expect(json["totalItems"]).to eq(55)
    end

    it "returns 5 pages" do
      expect(json["totalPages"]).to eq(6)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(:success)
    end
  end
end

RSpec.describe "GET Single Server Metric", type: :request do
  describe "GET /show" do
    before do
      FactoryBot.create(:server_metric, id: 1, cpu_temp: 1, cpu_load: 1, disk_load: 1)
      get "/api/v1/server_metrics/show/1"
    end

    it "gets the first post" do
      expect(response).to have_http_status(:success)
      metric = JSON.parse(response.body)
      expect(metric["id"]).to eq(1)
      expect(metric["cpu_temp"]).to eq(1)
      expect(metric["cpu_load"]).to eq(1)
      expect(metric["disk_load"]).to eq(1)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(:success)
    end
  end
end

# RSpec.describe "GET Average Per Day Server Metrics", type: :request do
#   describe "GET /avg_per_day" do
#     before do
#       FactoryBot.build(:average_metric)
#       get "/avg_per_day?num=3"
#     end

#     it "returns 3 results" do
#       expect(json.size).to eq(3)
#     end

#     it "returns status code 200" do
#       expect(response).to have_http_status(:success)
#     end
#   end
# end
