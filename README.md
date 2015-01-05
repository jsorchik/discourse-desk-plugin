# Discourse Desk.com Plugin
## Easily create desk cases from discourse topics

This plugin will add a "Create Desk Case" button to the bottom of each topic in a discourse forum. The button is visible to moderators and allows for the creation of a new case in a linked desk.com instance. If a case already exists for a topic, the button will change to indicate the case status and provide a link back to the desk case.

## Installation

Install like any other discourse plugin depending on your setup. I.E. by cloning this repo into the discourse plugins directory, adding it to your app.yml file, etc..

## Configuration

This plugin uses the [(un)official Desk API Client](https://github.com/forcedotcom/salesforce-deskcom-api) to connect to your desk instance. If your [environment variables are configured](https://github.com/forcedotcom/salesforce-deskcom-api#first-environmental-variables) then it should "just work". Otherwise, set the appropriate values in `lib/desk_case.rb`.

## Contributions

Pull Requests are welcome and there is certainly room for improvement.

Special thanks to the [excellent tutorials](https://meta.discourse.org/t/plugin-tutorial-2-how-to-add-a-button-at-the-end-of-a-topic/11040) from the Discourse team and to [shivpkumar's Zendesk Plugin](https://github.com/shivpkumar/Zendesk-Plugin).
