class DeskCustomer
  def initialize(email)
    @customer = DeskApi.customers.search(email: "#{email}").entries.first rescue nil
  end

  def id
    @customer.id
  end
end