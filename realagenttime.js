/*this widget figures out the time from creation of the ticket to the 
first comment a agent makes public or private. The only thing you have to 
edit is the input#ticket_fields_250972 for the Id of the field your system.
Right now is will save the difference in seconds but I have placed other 
variables that give hour dotted time and hours and minutes. The 
sidebar will display the hours and mintues. Just copy the code and place
it in a custom Zendesk widget.  
*/

<div id="realTime">
</div>
<script type="javascript">

	pausecomp = function(millis) 
	{
		var date = new Date();
		var curDate = null;

		do { curDate = new Date(); } 
		while(curDate-date < millis);
	} 

	//thank you http://webcloud.se/log/JavaScript-and-ISO-8601/
	Date.prototype.setISO8601 = function (string) {
		var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
		"(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\:([0-9]+))?)?" +
		"(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
		var d = string.match(new RegExp(regexp));

		var offset = 7;
		var date = new Date(d[1], 0, 1);

		if (d[3]) { date.setMonth(d[3] - 1); }
		if (d[5]) { date.setDate(d[5]); }
		if (d[7]) { date.setHours(d[7]); }
		if (d[8]) { date.setMinutes(d[8]); }
		if (d[10]) { date.setSeconds(d[10]); }
		if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
		if (d[14]) {
			offset = (Number(d[16]) * 60) + Number(d[17]);
			offset *= ((d[15] == '-') ? 1 : -1);
		}

		offset -= date.getTimezoneOffset();
		time = (Number(date) + (offset * 60 * 1000));
		this.setTime(Number(time));
	}   



$j(document).ready(function() {
    $j('input#ticket_fields_250972').attr("disabled", true);
  //Check to see if there isn't already a value
  if(!$j('input#ticket_fields_250972').val()) {
	
	//setting the DOM Object to attach the queue to
	var para = $j("select#ticket_assignee_id");
        var roleID = new Array();
	var count = 0;
	var commentAuthor = new Array();
	var ticketCreated = new Array();
	
        //beginning of queue
	para.queue("testQueue", function( next ){$j.get('/tickets/{{ticket.id}}.xml', 
		function(ticketCreateAt) {
			$j(ticketCreateAt).find('comment').each(function() {
				ticketCreated[count] = $j(this).find('created-at').text();
				commentAuthor[count] = $j(this).find('author-id').text();
				var timeUNIX = new Date();
				timeUNIX.setISO8601(ticketCreated[count]);
				ticketCreated[count] = Date.parse(timeUNIX)/1000;
				//displays in the sidewidget it can be removed.
				count++;
			});
			
		});
		next();  
	});
	


	para.delay( 500, "testQueue" );

	para.queue("testQueue", function( next ) {
		var i = 0;
		while( i < commentAuthor.length){
                        //pause to wait results 
			pausecomp(500);
			$j.get('/users/'+commentAuthor[i]+'.xml', function(findRole) {
				
				$j(findRole).find('user').each(function(){
					roleID.push($j(this).find('roles').text());
					
				});
			});
			
			i++;
		}
		next();
	});

	para.delay( 500, "testQueue" );

	para.queue("testQueue", function( next ) {
		var c = 1;
		
        do 
           { 

             if(roleID[c] != 0){agentUpdate = 'true'; break;}
            else {
              agentUpdate = 'false';
              c++;
             }
         } while (c <= roleID.length);

       if(agentUpdate === 'true'){
            //difference in seconds 
            time1 = (ticketCreated[c]- ticketCreated[0]);
            //difference in hour dot notation for example 2.3 hours
            diffTime = (ticketCreated[c]- ticketCreated[0])/3600;
            //minuteTime figures out the minutes from diffTime
            minuteTime = diffTime+''
            minuteTime =  minuteTime.split('.');
            minuteTime[1] = '.'+minuteTime[1];
            minuteTime[1] = parseFloat(minuteTime[1])*60;

             if(diffTime > 0) {
                 $j('#realTime').append('Hours: '+diffTime.toFixed(0)+' minutues '+ minuteTime[1].round());

                 //places the time in seconds in the text box on the form
                  $j('input#ticket_fields_250972').val(parseInt(time1));
              }else { $j('#realTime').append("No Agent has responded yet");}


         }
		
		next();
	});


	para.dequeue( "testQueue" );
  }
  else {
    diffTime = ($j('input#ticket_fields_250972').val())/3600;
    minuteTime = diffTime+''
    minuteTime =  minuteTime.split('.');
    minuteTime[1] = '.'+minuteTime[1];
    minuteTime[1] = parseFloat(minuteTime[1])*60;
    //to fixed found here http://www.electrictoolbox.com/javascript-fixed-digits-after-decimal-places/
    //places nice time in hours and minutes in the sidebar

    $j('#realTime').append('Hours: '+diffTime.toFixed(0)+' minutues '+ minuteTime[1].round());
  }
});         


</script>
