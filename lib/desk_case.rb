class DeskCase
  def initialize(params)
    @client = DeskApi.configure do |config|
      # DeskApi should "just work" if ENVs are set. Otherwise, provide these...
      # config.token           = ENV['DESK_TOKEN']
      # config.token_secret    = ENV['DESK_TOKEN_SECRET']
      # config.consumer_key    = ENV['DESK_CONSUMER_KEY']
      # config.consumer_secret = ENV['DESK_CONSUMER_SECRET']
      # config.endpoint        = ENV['DESK_ENDPOINT']
    end
  end

  def url
    "#{ENV['DESK_ENDPOINT']}/agent/case/#{@case.id}"
  end

  def status
    @case.status
  end

  def text
    return "View #{status.titleize} Desk Case"
  end

  def title
    case status
      when "new"      then "Case is New. "
      when "open"     then "Case is Open. "
      when "pending"  then "Case is Pending. "
      when "resolved"   then "Case has been Resolved. "
      when "closed"   then "Case has been Closed. "
      else "Case status is unknown. "
    end + "Click to view in Desk"
  end

  def exists?
    @case.present?
  end
end