import consumer from "./consumer"

var conversation = consumer.subscriptions.create("ConversationChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    var conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");

    if (data['window'] !== undefined) {
      var conversation_visible = conversation.is(':visible');

      if (conversation_visible) {
        var messages_visible = (conversation).find('.card-body').is(':visible');

        if (!messages_visible) {
          conversation.removeClass('bg-light').addClass('bg-success');
        }
        conversation.find('.messages-list').find('ul').append(data['message']);
      }
      else {
        $('#conversations-list').append(data['window']);
        conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
        conversation.find('.card-body').toggle();
      }
    }
    else {
      conversation.find('ul').append(data['message']);
    }

    var messages_list = conversation.find('.messages-list');
    var height = messages_list[0].scrollHeight;
    messages_list.scrollTop(height);
  },

  speak: function(message) {
    return this.perform('speak', {
      message: message      
    });
  }
});
$(document).on('submit', '.new_message', function(e) {
  e.preventDefault();
  var values = $(this).serializeArray();
  conversation.speak(values);
  $(this).trigger('reset');
});