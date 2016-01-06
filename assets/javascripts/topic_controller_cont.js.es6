import TopicController from 'discourse/controllers/topic';
import User from 'discourse/models/user'

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
