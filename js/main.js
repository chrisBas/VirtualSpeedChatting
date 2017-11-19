$('#secondaryVideo').mousedown(handleMousedown);
$('#messageField').keypress(checkKey);
$('#secondaryVideo').dblclick(swapVideos)

function swapVideos(){
  var secondary = $('#secondaryVideo').removeAttr('id');
  $('#mainVideo').removeAttr('id').attr('id', 'secondaryVideo').attr('style', secondary.attr('style'));
  secondary.removeAttr('style');
  secondary.attr('id', 'mainVideo');
  secondary.mousedown().off();
  secondary.dblclick().off();
  $('#secondaryVideo').mousedown(handleMousedown);
  $('#secondaryVideo').dblclick(swapVideos)
  
}

function checkKey(key){
  if(key.which==13){
    var textVal = $('#messageField').val();
    $('#messageField').val("");
    /* TODO: send message to server */
    addToChat(textVal, "self");
  }
}

function addToChat(textVal, className){
  $('#chatRoom').append('<div class="person '+className+'">'+textVal+'</div>')
  $('#chatRoom').scrollTop($('#chatRoom')[0].scrollHeight);
}

function handleMousedown(e){
  window.my_dragging = {};
  my_dragging.pageX0 = e.pageX;
  my_dragging.pageY0 = e.pageY;
  my_dragging.elem = this;
  my_dragging.offset0 = $(this).offset();
  function handleDragging(e){
      var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
      var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
      $(my_dragging.elem)
      .offset({top: top, left: left});
  }
  function handleMouseup(e){
      $('body')
      .off('mousemove', handleDragging)
      .off('mouseup', handleMouseup);
  }
  $('body')
  .on('mouseup', handleMouseup)
  .on('mousemove', handleDragging);
}
