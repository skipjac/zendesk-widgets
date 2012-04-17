<div id="second-comment">
</div>
<script>
(function(){
	ticketPath = document.location.pathname;
	var getComment = function(location){
			jQuery.getJSON(location, function(data){
			if (data.comments.length > 2 && data.comments[1].is_public === false) {
				jQuery('#second-comment').append(data.comments[1].value);
			}
		});
		
	} 
    getComment(ticketPath);
}());
</script>