<div id='hipchat_widget'>
</div>
<script type="text/javascript">

	 
$j(document).ready(function() {
  hipChatURL = 'http://api.hipchat.com/v1/rooms/show?';
  hipChatroomID = encodeURIComponent('room_id=put-your-room-number-here&');  //encodeURIComponent is needed for the ampersand
  hipChatauth = 'auth_token=put-your-token-here';

  $j.getJSON('/proxy/direct?url='+hipChatURL+hipChatroomID+hipChatauth, function(data) {
      lastActive = new Date(data.room['last_active']*1000);
      roomTitle = "<div class=\"hipentry\"><h2 class=\"roomTitle\">Room Name: " + data.room['name'] + "<\/h2>";
      roomTitle += "<em class=\"hiptopic\">Topic: " + data.room['topic'] + "</em>";
      roomTitle += "<p>Last Activity: "+lastActive+"<p>";
      roomTitle += "<h4>Users in the Room:</h4><ul>";
      $j('#hipchat_widget').append(roomTitle);
      var b = eval(data.room['participants']);
      if(b.length === 0 ){
              $j('#hipchat_widget').append("<li>there is no one online</li>");
          }
      $j.each(data.room.participants, function(key, value){ 
                 membersOnline = "<li>"+value.name+"</li>";
              $j('#hipchat_widget').append(membersOnline);
             });
      $j('#hipchat_widget').append('</ul></div>');
  });
});
</script>
