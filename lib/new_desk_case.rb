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
    "Link to forum topic:\n#{@url}\n\nComment:\n#{body_to_text}"
  end
end
