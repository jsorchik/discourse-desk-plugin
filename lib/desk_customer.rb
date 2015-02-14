class DeskCustomer
  def initialize(email = 'info@community.coinbase.com')
    @customer = DeskApi.customers.search(email: "#{email}").entries.first rescue nil
  end

  def id
    @customer.id rescue '281987990' # fail back to support user ID
  end
end
