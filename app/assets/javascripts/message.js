$(function(){
  function buildMessageHTML(message){
    message.image ? addImage = `<div class="lower-message__image">
                                  <img src= '${message.image}'>
                                </div>` : addImage = '';
    var html = `<div class="message", data-id=${message.id}>
                  <div class="user__name">
                    ${message.name}
                  </div>
                  <div class="message__time">
                    ${message.created_at}
                  </div>
                    <p class="message__content">
                      ${message.content}
                    </p>
                    ${addImage}
                </div>`
    return html;
  }

  $(function(){
    setInterval(automaticUpdate, 5000);
    function automaticUpdate(){
      $('.message')[0] ? message_id = $('.message:last').data('id') : messsge_id = 0;
      $.ajax({
        url: location.href,
        type:'GET',
        data: {
          message: {id:message_id }
        },
        dataType: 'json'
      })
      .done(function(message){
        $.each(message, function(i,new_message){
          buildMessageHTML(new_message);
        });
      })
      .fail(function(){
        alert('error')
      })
    };
  });

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(send_message){
      var html = buildMessageHTML(send_message);
      $('.messages').append(html)
      $('.Chat__message').val('')
      $('.Chat__send').prop('disabled',false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    })
  });
});
