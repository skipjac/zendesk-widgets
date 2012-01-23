(function() {
   var re = new RegExp(/<(.*)>/);

    doRequesterChangedStuff = function() {
        alert('requester changed');
    }
     // TODO: Delete this code after we create a better hook.
    // jQuery('#ticket_requester_name').observe_field(2, doRequesterChangedStuff);

     // Use this instead:
     // jQuery('#ticket_requester_name').change(doRequesterChangedStuff);

    getName = function(){
        var requesterID = '';
         if (jQuery('#ticket_requester_name').val() !== ''){
             requesterID = re.exec(jQuery('#ticket_requester_name').val());
             HasTickets(requesterID[1]);
         }

    }

     HasTickets = function(y) {

         if (y) {
             $j.getJSON('/search.json?query=status<solved+type%3Aticket+requester:' + y, function(searchResults) {
                 var x = searchResults.length;
                 if (x > 1) {
                     checkDupeTix2();
                 }
                 return x;
             });
         }
     }

     hideDiv = function(){
         $j("ul#banners li").hide();
         $j("ul#banners").html('<script type="text/html" id="banner-item-template" data-template-name="banner-item"> <li> <span class="icon">&nbsp; &nbsp; &nbsp; </span> <span class="content">{{ text }}</span> <span class="ignore">(<a href="#">ignore this</a>)</span> <span class="reload">(<a href="">reload</a>)</span> </li> <\/script>');
     }


     checkDupeTix2 = function() {
         hideDiv();

             $j("ul#banners").append('<li style="display: block;"><span class="icon">&nbsp; &nbsp; &nbsp; </span><span class="content">This requester has more than 1 open ticket. Please check for duplicate tickets.</span><span class="ignore">(<a href="#" onclick="hideDiv();return false ">ignore this</a>)</span><span class="reload"><a href="">reload</a></span></li>');
             $j("ul#banners li").show();

     }

     $j(document).ready(function() {
        if ( jQuery('#ticket_requester_name').val() ){ 
              getName();
        }

     });
     $j('input#ticket_requester_name').blur(function() {
     	getName();
     });


} ());