class ::DeskController < ::ApplicationController
  require 'desk_api'

  def create_case
    the_case = NewDeskCase.new(
      case_data: {
        type: 'email',
        labels: ['Community'],
        subject: params[:topic_title],
        external_id: params[:external_id],
        _links: {
          customer: {
            href: '/api/v2/customers/305498525', # your id will be different
            class: 'customer'
          }
        },
        message: {
          direction: 'in',
          status: 'received',
          subject: params[:topic_title],
          body: nil,
          from: 'contact@community.coinbase.com',
          to: 'community@coinbase.com'
        }
      },
      post_url: params[:post_url],
      html_comment: params[:html_comment],
      submitter_username: params[:submitter_username]
    )

    render_case_json(the_case)
  end

  def find_case
    return render nothing: true unless current_user && current_user.staff?
    the_case = ExistingDeskCase.new(params[:external_id])
    render_case_json(the_case)
  end

  def render_case_json(the_case)
    if the_case.exists?
      render json: { url: the_case.url,
                     text: the_case.text,
                     title: the_case.title,
                     css_class: the_case.status,
                     exists: true }
    else
      render json: { text: 'Create Desk Case',
                     title: 'Click to create a new case in Desk',
                     exists: false }
    end
  end
end
