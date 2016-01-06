import { on } from 'ember-addons/ember-computed-decorators';

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
  }
}
