<!--
*  This widget will calculate the time the ticket was assigned
*  to a group and in the open state. 
*  It will also calculate the time it take the agent to 1st respond to the ticket 
*  after it has been assigned to the group
-->

<div id='timeinstatus'>
    <div style='padding: 4px; font-weight: bold; font-size: 18px;'>
        <div id='open_status'></div>
        <div id='pending_status'></div>
        <div id='first_resp'></div>
    </div>
</div>


<script>
(function() {


//globals 
var timeOpen = 0, timePending = 0, statecount = 0, commentcount = 0;
var timeUNIX = new Date();


//The hashes to store the events 
var stateHash = {};
var userRolearray = {};
var commentHash = {};
var userIDhash = {};



//Writes the data to the sidebar widget
    log_open = function(arg) {
        $('open_status').innerHTML = arg;
    }

    log_pending = function(arg) {
        $('pending_status').innerHTML = arg;
    }
     log_first = function(arg) {
        $('first_resp').innerHTML = arg;

    }

//does a JSON request to the user profile for each comment
var userRole = function(userID) { 
	var deferreds = [];
         for(ha = 0; ha < commentcount; ha++) {
            deferreds.push($j.getJSON('/users/'+userID['comment' + ha][1]+'.json', userFetcher(ha, userID)));

  }
	
  return $j.when.apply($, deferreds);
}

//this finds the user role in the profile, needed to fix scoping issues with JSON calls
var userFetcher = function(index, userID) {
  return function(userData){
             userIDhash[userID['comment' + index][1]] = userData.roles;
          }	
}

//this get the first agent response after group assignment 
var agentFirstrepsonse = function(comments){
            var firstresp = 0;
            
             userRole(comments).done( function(){ 
                 firstComment = Date.parse(comments['comment0'][2])/1000;
                 diffTime(stateHash,firstComment);
                 
               for(ja =1; ja < commentcount; ja++){ 
                   var commentTime = Date.parse(comments['comment' + ja][2])/1000;
                 if(userIDhash[comments['comment' + ja][1]] >= 2 && firstresp == 0){     
                    total1 = (Date.parse(comments['comment' + ja][2])/1000) - firstComment;
                    //console.log("1st Resp " + total1);
                    log_first("1st Resp " + niceTime(total1));
                    jQuery('#ticket_fields_250972').val(total1);
                    firstresp++;
                }
            }
         }
       
       );

}
//changes the time from UNIX to HH:MM
var niceTime = function(nice){
            //minuteTime figures out the minutes from diffTime
            nice = nice; 

            minuteTime = parseInt(nice/60, 10); 
            hourTime = parseInt(minuteTime/60, 10); 
            minutes = parseInt(minuteTime%60, 10); 
            hourTime = hourTime+'';
           if(minutes < 10) { minutes = "0"+minutes;}
            else{ minutes = minutes+''; }
           return hourTime+':'+ minutes;
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


//does the tally of time in state if the ticket is not solved the current time is used for the last state
var states = function(previousState, currentState, diff){ //console.log(previousState, currentState, diff);
    if(previousState <= 1 && currentState <= 2) {
          timeOpen = timeOpen + diff;
          log_open("Open: "+niceTime(timeOpen));
          jQuery('#ticket_fields_20442201').val(timeOpen);
         }
    else if(previousState == 2 && currentState <= 1 ) {
           timePending = timePending + diff; 
           log_pending("Pending: "+niceTime(timePending));
           jQuery('#ticket_fields_20447432').val(timePending);
        }
    else if(currentState == 3 && previousState <= 1) { 
           timeOpen = timeOpen + diff;
           log_open("Open: "+niceTime(timeOpen));
           jQuery('#ticket_fields_20442201').val(timeOpen);
         }
    else if(currentState == 3 && previousState == 2) {
           timePending = timePending + diff; 
           log_pending("Pending: "+niceTime(timePending));
           jQuery('#ticket_fields_20447432').val(timePending);
         }
    else if(previousState == 3 && currentState <= 1) { 
            timeOpen = timeOpen + diff;
            log_open("Open: "+niceTime(timeOpen));
            jQuery('#ticket_fields_20442201').val(timeOpen);
         }
    else if(previousState == 3 && currentState == 2) {
           timePending = timePending + diff; 
           log_pending("Pending: "+niceTime(timePending));
           jQuery('#ticket_fields_20447432').val(timePending);
           }
    else if(previousState == 10 && currentState <= 1) { 
           timeOpen = timeOpen + diff; 
           log_open("Open: "+niceTime(timeOpen));
           jQuery('#ticket_fields_20442201').val(timeOpen);
          }
    else if(previousState == 10 && currentState == 2) {
            timePending = timePending + diff; 
            log_pending("Pending: "+niceTime(timePending));
            jQuery('#ticket_fields_20447432').val(timePending);
           }

  }



//goes through the events and figures the difference between event times
var diffTime = function(theHash, start) {
    //console.log(theHash);
    //console.log("start" + start)
    var timeNow = Date.parse(timeUNIX)/1000;
    //console.log("timenow" + timeNow)
    //console.log('state count ' + statecount);
    if ( statecount == 1 ){ 
           total = timeNow - (theHash['test0'][3]);
           states(theHash['test0'][4], theHash['test0'][5], total);
    } else {
    for( x = 1; x < statecount;  x++) {

      var total = 0;
      var lastIteration = (x == (statecount - 1));
      var currentHash   = theHash['test' + x];
      var previousHash  = theHash['test' + (x-1)];



      if (!lastIteration) {

        //console.log('previousHash[3]:', previousHash[3]);
        //console.log('currentHash[3]:', currentHash[3]);

        if (previousHash[3] >= start) {

            total = (currentHash[3]) - (previousHash[3]) ;
            states(currentHash[4], currentHash[5], total);
        }
        else if (currentHash[3] >= start) {  

            total = (currentHash[3]) - start;
            states(currentHash[4], currentHash[5], total);
        }
      }

      if (lastIteration) {

          // solved
          if(theHash['test' + x][3] >= start && theHash['test' + x][5] == 3){

                   total = (theHash['test' + x][3]) - (theHash['test' + (x - 1)][3]);
                   states(theHash['test' + x][4], theHash['test' + x][5], total);
                 }

          // not solved
          else if(theHash['test' + x][3] >= start && theHash['test' + (x-1)][3] >= start  && theHash['test' + x][5] != 3){

                    total = (theHash['test' + x][3]) - (theHash['test' + (x - 1)][3]);
                    states(theHash['test' + x][4], theHash['test' + x][5], total);

                    total = timeNow - (theHash['test' + x][3]);
                     states(10, theHash['test' + x][5], total);
               }

          // not solved
          else if(theHash['test' + x][3] >= start  && theHash['test' + x][5] != 3){

                    total = timeNow - (theHash['test' + x][3]);
                     states(10, theHash['test' + x][5], total);
               }
         else { total = timeNow - start; 
                states(10, theHash['test' + x][5], total);
                }
      }


    }
  }
}





//pulls the events getting the status changes, group changes and comments
          $j.getJSON('/tickets/{{ticket.id}}/events.json?filter=audits', function(eventsAudit){
            $j.each(eventsAudit , function(i, item) {

              $j.each(item.events, function(index, obj) { 
               if(obj.value_reference === 'status_id'){  
               stateHash['test' + statecount] = [obj.value_reference, obj.author_id, obj.created_at, Date.parse(obj.created_at)/1000, obj.value_previous, obj.value] ;
               statecount++;
              } else if(obj.type === 'Comment'){ 
                commentHash['comment' + commentcount] = [obj.value_reference, obj.author_id, obj.created_at,  obj.value_previous, obj.value] ;
                commentcount++;
              }


             });



 });
agentFirstrepsonse(commentHash);
   });




}());

</script>

