(function($) {
   var re = new RegExp(/<(.*)>/);
   var requesterNameField = null;
   var showTicket = 1;
   var newTicket = 0;

    var getName = function(ticketType){
        var requesterID = '';
        // var requesterNameField = $('#ticket_requester_name');

         if (requesterNameField.val() !== ''){
             requesterID = re.exec(requesterNameField.val());
             HasTickets(requesterID[1], ticketType);
         }

    }

     var HasTickets = function(y, z) {

         if (y) {
             $.getJSON('/search.json?query=status<solved+type%3Aticket+requester:' + y, function(searchResults) {
                 var x = searchResults.length;
                 if (x > z) {
                     checkDupeTix2();
                 }
                 return x;
             });
         }
     }

     var hideDiv = function(){
         $("ul#banners li").hide();
         $("ul#banners").html('<script type="text/html" id="banner-item-template" data-template-name="banner-item"> <li> <span class="icon">&nbsp; &nbsp; &nbsp; </span> <span class="content">{{ text }}</span> <span class="ignore">(<a href="#">ignore this</a>)</span> <span class="reload">(<a href="">reload</a>)</span> </li> <\/script>');
     }


     var checkDupeTix2 = function() {
         hideDiv();

             $("ul#banners").append('<li style="display: block;"><span class="icon">&nbsp; &nbsp; &nbsp; </span><span class="content">This requester has more than 1 open ticket. Please check for duplicate tickets.</span><span class="ignore">(<a href="#" onclick="hideDiv();return false ">ignore this</a>)</span><span class="reload"><a href="">reload</a></span></li>');
             $("ul#banners li").show();

     }

     $(document).ready(function() {
         requesterNameField = $('#ticket_requester_name');
         
        if ( requesterNameField .val() ){ 
              getName(showTicket);
        }
       requesterNameField.blur(function() {
        	getName(newTicket);
         });
     });
     


}(jQuery));
