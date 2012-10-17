<div id="private_comment">
{{current_user.signature}}
</div>
<script>
$j('#private_comment').hide();
var loaded = false;
var commentStatus = function () {
	return $j('input#comment_is_public:checked').length;
	};
  var commentThing = function () {
    var commentChangeStatus = $j('#comment_value').val();
    if ( commentChangeStatus.length > 0 ) {
        commentChangeStatus += $j('#private_comment').text();
       if ((commentStatus() === 0) && (loaded === false)){
         loaded = true;
          $j('#comment_value').val(commentChangeStatus);
         }
  }
};
  
  $j(document).ready( function () {
    $j(document).unbind('.zendesk.keyboard-shortcut'); 
    $j(document).keypress(function(event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) {return true;}
        commentThing();
        submitTicketForm();
        event.preventDefault();
        return false;
      });
    
    }
  );

$j('#comment_value').focusout( function() {
    commentThing();
	});
$j('input#comment_is_public').change();
</script>