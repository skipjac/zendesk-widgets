<div id='requesterTicketList'>
<div class='requesterTickets'>
      <div id='newTicket'></div>
      <div id='openTicket'></div>
</div>
</div>
<script>
(function() {
    var statusList = { 0:"New", 1:"Open", 2:"Pending", 3:"Solved", 4:"Closed"};
    var typeList = { 0:"None", 1:"Question", 2:"Incident", 3:"Problem", 4:"Task"};
    var priorityList = { 0:"None", 1:"Low", 2:"Normal", 3:"High", 4:"Urgent"};
    var getStatusList = function(statusValue) { return statusList[statusValue]; }
    var gettypeList = function(typeValue) { return typeList[typeValue]; }
    var getpriorityList = function(priorityValue) { return priorityList[priorityValue]; }
    var formatDate = function(dateValue){ var newFormat = dateValue.split(" "); return newFormat[0]; }
    var reqesterID = '{{ticket.requester.id}}';
    
      
      
     if(reqesterID){ 
               $j.getJSON('/search.json?query=status<solved+type%3Aticket+requester_id:' + reqesterID, function(searchResults){ 
                   $j.each(searchResults , function(i, item) {
                                                     
                      var html = "<a href=\"/tickets\/" + item.nice_id + "\" target=\"_blank\"><b>Ticket: "+ item.nice_id+" >><\/b><\/a> "+item.subject+"<\/br>";
                      html += "<b>Ticket Type:<\/b> "+ gettypeList(item.ticket_type_id) +"<\/br><b>Status:<\/b> "+ getStatusList(item.status_id) +"<\/br>";
                      if(item.ticket_type_id === 4){  html += "<b>Due Date:<\/b> "+ formatDate(item.due_date) +"<\/br>";}
                      html += "--------------------------------------------";
                      $j('#openTicket').append(html)
            });
     });
  }  
 
}());
</script>