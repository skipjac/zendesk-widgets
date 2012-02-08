<div id='timeinstatus'>
    <div style='padding: 4px; font-weight: bold; font-size: 18px;'>
        <div id='open_status'></div>
        <div id='pending_status'></div>
    </div>
</div>


<script>
(function() {
/*
*  This widget will calculate the time the ticket was assigned
*  to a group and in the open state. 
*/
var timeOpen = 0;
var timePending = 0;
var innercount = 0;
var hashtable = {};
var userRolearray = {};

var timeUNIX = new Date();


    log_open = function(arg) {
        $('open_status').innerHTML = arg;
    }

    log_pending = function(arg) {
        $('pending_status').innerHTML = arg;
    }

//changes the time from UNIX to HH:MM
niceTime = function(nice){
            //minuteTime figures out the minutes from diffTime
            nice = nice/3600;
            minuteTime = nice+''
            minuteTime =  minuteTime.split('.');
            minuteTime[1] = '.'+minuteTime[1];
            minuteTime[1] = parseFloat(minuteTime[1])*60;
           return nice.toFixed(0)+':'+ minuteTime[1].round();
}

//does the tally of time in state if the ticket is not solved the current time is used for the last state
states = function(previousState, currentState, diff){   
    if(previousState <= 1){timeOpen = timeOpen + diff; log_open("Open: "+niceTime(timeOpen));}
    else if(previousState == 2) {timePending = timePending + diff; log_pending("Pending: "+niceTime(timePending));}
    else if(currentState == 3 && previousState <= 1) { timeOpen = timeOpen + diff; log_open("Open: "+niceTime(timeOpen));}
    else if(currentState == 3 && previousState == 2) {timePending = timePending + diff; log_pending("Pending: "+niceTime(timePending)); }
    else if(previousState == 3 && currentState <= 1) { timeOpen = timeOpen + diff; log_open("Open: "+niceTime(timeOpen));}
    else if(previousState == 3 && currentState == 2) {timePending = timePending + diff; log_pending("Pending: "+niceTime(timePending));}
  }



//goes through the events and figures the difference between event times
diffTime = function(theHash){
    var timeNow = Date.parse(timeUNIX)/1000;
    for( x = 1; x < innercount;  x++) {
     //console.log(theHash['test' + x]+" the innercount "+innercount);
      var total = 0;
      if(x !== innercount - 1){
          total = (theHash['test' + x][3]) - (theHash['test' + (x - 1)][3]);
          //console.log(theHash['test' + x][3]+" the diff "+total+" state "+theHash['test' + x][4]);
          states(theHash['test' + x][4], theHash['test' + x][5], total);
       } else {  
                  if(theHash['test' + x][5] == 3) { total = (theHash['test' + x][3]) - (theHash['test' + (x - 1)][3]); }

                  else {total = timeNow - (theHash['test' + (x - 1)][3]); }
                     //console.log("the last event "+theHash['test' + x][3]+" the diff "+total+" state "+theHash['test' + x][5]);
                     states(theHash['test' + x][4], theHash['test' + x][5], total);
               }
    }
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
		}

		offset -= date.getTimezoneOffset();
		time = (Number(date) + (offset * 60 * 1000));
		this.setTime(Number(time));
	}   
//pulls the events and gets the change in status only 
$j.getJSON('/tickets/{{ticket.id}}/events.json?filter=audits', function(eventsAudit){
            $j.each(eventsAudit , function(i, item) {
             //console.log(item.events);
              $j.each(item.events, function(index, obj) { 

               if(obj.value_reference === 'status_id'){  

               hashtable['test' + innercount] = [obj.value_reference, obj.author_id, obj.created_at, Date.parse(obj.created_at)/1000, obj.value_previous, obj.value] ;
              //console.log(hashtable['test' + innercount] );
               innercount++;
            }

              });

         });
      diffTime(hashtable);
});



}());

</script>

