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
     hideDiv = function(){
         $("ul#banners li.skip").css("display", "none");
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




     var checkDupeTix2 = function() {

              hideDiv();
             $("ul#banners").append( '<li class="skip"><span class="icon">&nbsp; &nbsp; &nbsp; </span><span class="content">This requester has more than 1 open ticket. Please check for duplicate tickets.</span><span class="ignore">(<a href="#" OnClick="hideDiv();" >ignore this</a>)</span><span class="reload"><a href="">reload</a></span></li>');

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