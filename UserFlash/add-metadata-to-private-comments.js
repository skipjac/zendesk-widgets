<div id="private-comment">
<div class="select">
    <label for="zendeskSelect">Select Spoke Account</label>
     <select id="zendeskSelect" name="zendeskSelect" onchange style="width: auto;">
          <option value="">-</option>
          <option value="Inbound Email">Inbound Email</option>
		  <option value="Outbound Email">Outbound Email</option>
		  <option value="Outbound Call">Outbound Call</option>
		  <option value="Inbound Call">Inbound Call</option>
		  <option value="Escalation  Private Comment">Escalation  Private Comment</option>
		  <option value="Closing Private Comment">Closing Private Comment</option>
		  <option value="Merging Private Comment">Merging Private Comment</option>
		  <option value="Related Ticket Private Comment">Related Ticket Private Comment</option>
		  <option value="Other Private Comment">Other Private Comment</option>
     </select>
</div>

<script type="javascript">
(function () {
	//the metafield has to be appended instead the form div just after the custom fields. 
	jQuery('#ticket_custom_fields').append('<input id="ticket_metadata_interaction_type" name="ticket[metadata][interaction_type]"type="hidden">')
    hideDiv = function(){
        $j("ul#banners li.meta-warning").css("display", "none");
    }
    Metawarning = function() {
        hideDiv();
       $j("ul#banners").append( '<li class="meta-warning"><span class="icon">&nbsp; &nbsp; &nbsp; </span><span class="content">Please select a Meta Data type for Private Comments</span><span class="ignore">(<a href="#" OnClick="hideDiv();" >ignore this</a>)</span><span class="reload"><a href="">reload</a></span></li>');

    }
	
	var commentStatus = function () {
		return $j('input#comment_is_public:checked').length;
	}
	var metaData = function () {
		if ( $j('#ticket_metadata_interaction_type').val() !== '' ) {
			$j('input#submit-button').attr('onclick', 'submitTicketForm();');
		} else {
			Metawarning();
		}
		
	}
	
	$j('input#comment_is_public').change( function() {
		var commentChangeStatus = commentStatus();
		if (commentChangeStatus === 0){
			$j('input#submit-button').attr('onclick', 'Metawarning();');
			metaData();
		} else {
			$j('input#submit-button').attr('onclick', 'submitTicketForm();');
		}
		
	});
	$j('#zendeskSelect').change( function() {
		$j('#ticket_metadata_interaction_type').val($j('#zendeskSelect').val());
		metaData();
	}
);
	
	
	
}());
</script>