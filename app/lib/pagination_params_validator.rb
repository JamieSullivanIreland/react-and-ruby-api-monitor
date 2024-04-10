class PaginationParamsValidator
  include ActiveModel::Validations

  attr_reader :data

  def initialize(data)
    @data = data
  end

  def read_attribute_for_validation(key)
    data[key]
  end

  def add_nested_errors_for(attribute, other_validator)
    errors.messages[attribute] = other_validator.errors.messages
    errors.details[attribute] = other_validator.errors.details
  end
end
