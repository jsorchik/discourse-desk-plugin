# name: desk
# about: create and view status of desk.com case within each topic
# version: 0.3
# authors: Josh Sorchik. Forked from https://github.com/shivpkumar/Zendesk-Plugin
# url: https://github.com/jsorchik/discourse-desk-plugin

gem 'addressable', '2.3.7', require: false
gem 'simple_oauth', '0.2.0'
gem 'desk_api', '0.6.1'

register_asset 'javascripts/discourse/initializers/discourse-desk-button.js.es6'
register_asset 'stylesheets/buttons_cont.css.scss'

after_initialize do
  load File.expand_path('../controllers/desk_controller.rb', __FILE__)
  load File.expand_path('../lib/desk_case.rb', __FILE__)
  load File.expand_path('../lib/new_desk_case.rb', __FILE__)
  load File.expand_path('../lib/existing_desk_case.rb', __FILE__)

  Discourse::Application.routes.prepend do
    post 'desk/create_case' => 'desk#create_case'
    get 'desk/find_case' => 'desk#find_case'
  end
end
