# name: desk
# about: create and view status of desk.com case within each topic
# authors: jsorchik. Forked from https://github.com/shivpkumar/Zendesk-Plugin

gem 'simple_oauth', '0.2.0'
gem 'desk_api', '0.6.1'

register_asset "javascripts/topic_controller_cont.js"
register_asset "javascripts/topic_route_cont.js"
register_asset "javascripts/desk_button.js"
register_asset "stylesheets/buttons_cont.css.scss"

after_initialize do
  load File.expand_path("../controllers/desk_controller.rb", __FILE__)
  load File.expand_path("../lib/desk_case.rb", __FILE__)
  load File.expand_path("../lib/new_desk_case.rb", __FILE__)
  load File.expand_path("../lib/existing_desk_case.rb", __FILE__)
  load File.expand_path("../lib/desk_customer.rb", __FILE__)

  Discourse::Application.routes.prepend do
    post 'desk/create_case' => 'desk#create_case'
    get 'desk/find_case' => 'desk#find_case'
  end
end
