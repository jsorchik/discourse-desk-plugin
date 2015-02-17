class DeskCustomer
  def initialize(params)
    if params[:requester].present? && params[:requester][:email].present?
      @email = params[:requester][:email]
    else
      @email = 'info@community.coinbase.com'
    end
    @customer = DeskApi.customers.search(email: "#{email}").entries.first rescue nil
  end

  def id
    @customer.id rescue '281987990' # fail back to support user ID
  end

  def email
    @email
  end
end
