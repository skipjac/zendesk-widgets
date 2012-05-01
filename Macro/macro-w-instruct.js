<div id="macro-instruction">
</div>

<script>
(function () {
var test = function () {
$j("#comment_value").delay(500, "myQueue").queue("myQueue", function(){ 
        var macroText = jQuery('#comment_value').val();
        var macroInstruct = macroText.split('****');
        jQuery('#comment_value').val(macroInstruct [0]);
        jQuery('#macro-instruction').append(macroInstruct [1]);
        }).dequeue("myQueue");
}


jQuery('div._macro_list li.link').click( function() { test(); });



}());
</script>