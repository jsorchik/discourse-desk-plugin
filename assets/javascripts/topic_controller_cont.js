Discourse.TopicController.reopen({
  deskCase: {
    text: 'Create Desk Case',
    title: 'Click to create a new case in Desk',
    exists: false
  },

  actions: {
    sendToDesk: function(posts, currentUser, topicCreatorUsername) {
      var topicController = this,
          post = posts.shift(),
          title = post.topic.title,
          bodyAsHtml = post.cooked,
          createdAt = post.created_at,
          topicId = post.topic_id,
          categoryId = post.topic.category_id,
          topicSlug = post.topic_slug,
          collaboratorEmail = false,
          requesterInfo = false

      var makeAjaxCall = function() {
        if (collaboratorEmail && requesterInfo) {
          return Discourse.ajax("/desk/create_case", {
            dataType: 'json',
            data: { post_title: title,
                    html_comment: bodyAsHtml,
                    created_at: createdAt,
                    requester: requesterInfo,
                    collaborator_email: collaboratorEmail,
                    external_id: topicSlug + topicId,
                    post_url: window.location.href },
            type: 'POST'
          }).then(function (the_case) {
            topicController.setProperties({ deskCase: the_case });
          });
        }
      };
      
      Discourse.User.findByUsername(currentUser.get('username')).then(function (currentUser) {
        collaboratorEmail = currentUser.get('email');
      }).then(makeAjaxCall);

      Discourse.User.findByUsername(topicCreatorUsername).then(function (topicCreator) {
        requesterInfo = { name: topicCreator.get('name'), email: topicCreator.get('email')};
      }).then(makeAjaxCall);
    },

    redirectToDesk: function(url) { window.open(url); }
  }
});