Discourse.DeskButton = Discourse.ButtonView.extend({
  rerenderTriggers: ['controller.deskCase.exists'],

  classNames: ['desk'],
  classNameBindings: ['controller.deskCase.css_class'],
  titleBinding: 'controller.deskCase.title',
  textBinding: 'controller.deskCase.text',

  click: function() {
    if (this.get('controller.deskCase.exists')) {
      this.get('controller').send('redirectToDesk', this.get('controller.deskCase.url'));
    } else {
      this.get('controller').send('sendToDesk', this.get('controller.postStream.posts'), this.get('controller.currentUser'), this.get('controller.postStream.firstLoadedPost.username'));
    }
  },

  renderIcon: function(buffer) {
    buffer.push("<i class='fa fa-ticket'></i>");
  }
});

Discourse.TopicFooterButtonsView.reopen({
  addDeskButton: function() {
    if (this.get('controller.currentUser.staff')) {
      this.attachViewClass(Discourse.DeskButton);
    }
  }.on("additionalButtons")
});
