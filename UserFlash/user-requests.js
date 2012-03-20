(function($) {
	//place the message you want for each language here
	langMap = {
		1: "something in english",
		2: "something in spanish",
		16: "something in french",
		19: "something in portugese"
		
	}
	
     hideDiv = function(){
         $("ul#banners li.skip").css("display", "none");
     }
     var HasTickets = function() {

             $.getJSON('/api/v1/requests.json', function(searchResults) {
                 var x = searchResults.length;
                 if (x === 0) {
                     checkDupeTix2(x);
                 }
                 return x;
             });
             $.getJSON('/api/v1/requests.json?filter=solved', function(searchResults) {
                 var q = searchResults.length;
                 if (q === 0) {
                     checkDupeTix2(q);
                 }
                 return q;
             });		 
        
     }

     var checkDupeTix2 = function(xLength) {

	  		$.getJSON('/users/current.json', function(data) {
				 hideDiv();
				 if (langMap[data.locale_id] == null) {
					 uLang = langMap[1];
				 } else {
				 	uLang = langMap[data.locale_id];
				 }
	  			
	  			$("ul#banners").append( '<li class="skip"><span class="icon">&nbsp; &nbsp; &nbsp; </span><span class="content">' +  uLang +'.</span><span class="ignore">(<a href="#" OnClick="hideDiv();" >ignore this</a>)</span><span class="reload"><a href="">reload</a></span></li>');
	  		})
			  
             

     }

     $(document).ready(function() {
		 HasTickets();
     });

}(jQuery));
