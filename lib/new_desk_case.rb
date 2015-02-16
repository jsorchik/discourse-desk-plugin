class NewDeskCase < DeskCase
  def initialize(params)
    super
    @url = params[:post_url]
    @html_comment = params[:html_comment]
    params[:case_data][:message][:body] = format_comment
    @case = @client.cases.create(params[:case_data])
  end

  private

  def format_comment
    body_to_text = Nokogiri::HTML(@html_comment).text
    "This support case has been created on your behalf by the Coinbase\
     Support team in reference to your post on our Community forum.\
     We'll follow up with you via this email ticket and look forward to resolving\
     your issue.\
     \n\nLink to forum topic:\n#{@url}\n\nComment:\n#{body_to_text}"
  end
end
