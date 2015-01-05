class ExistingDeskCase < DeskCase
  def initialize(existing_id)
    super
    @case = @client.cases.find("e-#{existing_id}") rescue nil
  end
end