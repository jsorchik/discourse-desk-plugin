import { on } from 'ember-addons/ember-computed-decorators';
import TopicController from 'discourse/controllers/topic';
import User from 'discourse/models/user';
import TopicRoute from 'discourse/routes/topic';

export default {
  name: 'discourse-desk-button',
  initialize(container) {
    const ButtonView = container.lookupFactory('view:button');
    const MainButtons = container.lookupFactory('view:topic-footer-main-buttons');
    const user = container.lookup('current-user:main');

    const DeskButton = ButtonView.extend({
      rerenderTriggers: ['controller.deskCase.exists'],

      classNames: ['desk'],
      classNameBindings: ['controller.deskCase.css_class'],
      titleBinding: 'controller.deskCase.title',
      textBinding: 'controller.deskCase.text',

      click: function() {
        if (this.get('controller.deskCase.exists')) {
          this.get('controller').send('redirectToDesk', this.get('controller.deskCase.url'));
        } else {
          this.get('controller').send('sendToDesk', this.get('controller.model.postStream.posts'), this.get('controller.currentUser'));
        }
      },

      renderIcon: function(buffer) {
        buffer.push("<i class='fa fa-ticket'></i>");
      }
    });

    MainButtons.reopen({
      @on('additionalButtons')
      addDeskButton: function() {
        if (user && user.staff) {
          this.attachViewClass(DeskButton);
        }
      }
    });

    TopicController.reopen({
      deskCase: {
        text: 'Create Desk Case',
        title: 'Click to create a new case in Desk',
        exists: false
      },

      actions: {
        sendToDesk: function(posts, currentUser) {
          var topicController = this,
              post = posts.shift(),
              title = post.topic.title,
              bodyAsHtml = post.cooked,
              createdAt = post.created_at,
              topicId = post.topic_id,
              topicSlug = post.topic_slug,
              modEmail = false;

          var makeAjaxCall = function() {
            if (modEmail) {
              return Discourse.ajax("/desk/create_case", {
                dataType: 'json',
                data: { topic_title: title,
                        html_comment: bodyAsHtml,
                        created_at: createdAt,
                        mod_email: modEmail,
                        external_id: "community-" + topicId,
                        post_url: window.location.href },
                type: 'POST'
              }).then(function (the_case) {
                topicController.setProperties({ deskCase: the_case });
              });
            }
          };

          User.findByUsername(currentUser.get('username')).then(function (currentUser) {
            modEmail = currentUser.get('email');
          }).then(makeAjaxCall);
        },

        redirectToDesk: function(url) { window.open(url); }
      }
    });

    TopicRoute.on("setupTopicController", function(event) {
      Discourse.ajax("/desk/find_case", {
        dataType: 'json',
        data: { external_id: "community-" + event.currentModel.id },
        type: 'GET'
      }).then(function (the_case) {
        if (the_case) event.controller.setProperties({ deskCase: the_case });
      });
    });
  }
}
