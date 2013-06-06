<div id='adhocProjectManagement'>
<div class='projectTickets'>
      <div id='projectTag'></div>
      <div id='projectParent'></div>
      <div id='projectTicket'></div>
</div>
<!-- group dropdown -->
<div class="pCheckbox">

</div>

<!-- create a single ticket -->
<div class="pCheckbox">
<input type="checkbox" name="singlecheck" value="single" id="singlecheck" />Create Single Child Ticket<br />
</div>
<div class="singlecreate"  >
     <li>
        <label for="userEmail">Email</label>
         <span>Email Address of Internal Requester</span>
         <select id="single_group" name="single_group"  multiple="multiple"></select>
      </li>
      <li>
         <label for="single_group">Organization</label>
         <select id="single_group" name="single_group"  multiple="multiple"></select>
       </li>
      <li>
          <label for="ticketSubject">Subject</label>
           <span> (required) </span>
          <input class="required" type="text" name="ticketSubject" id="ticketSubject" style="width: 196px" value="{{ticket.title}}- Sub-ticket of {{ticket.id}}"/>
       </li>
       <li>
          <label for="ticketDesc">Description<label>
           <span> (required) </span> 
          <textarea class="required" rows="10" name="ticketDesc" id="ticketDesc" style="width: 196px">{{ticket.description}}</textarea>
        </li>

    <input type='button' value='Create one Child' onclick='attempt_child();'>

</div>
    


<!-- this is used to pull ticket data for variables in the javascript -->
<div id="ticket_title" style="display: none">{{ticket.title}}</div>
{% capture test %}{{ ticket.tags | join: ',' }}{% endcapture %}
<div id="ticket_description"  style="display: none">{{ticket.description}}</div>

</div>

<!-- the script -->
<script type="javascript">
(function() {
//Widget.require('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js', {type: 'text/javascript'});

var groupPageCount = 1;
var customFieldIDremove = {20541671:''};
var customFieldID = {20541671:'Project-{{ticket.id}}'};
var prjField = '#ticket_fields_20541671';
     $j(''+ prjField +'').attr("disabled", true); 

var tags = '{{ test }}';
//console.log(tags);

var tagsArray  = tags.split(' ');
var childTicket = $j.inArray('project_child', tagsArray);
//console.log(tagsArray);
//console.log(childTicket);
if (childTicket != -1) {
    $j('.pCheckbox').hide();
    $j('.cCheckbox').show();

}

var newTags = function() {
    var newTagsString = '';
    var currentTags = tagsArray;
    var moodThere2 = $j.inArray('project_child', currentTags);
    var moodThere3 = $j.inArray(ticketExternalID.replace(/-/i, '_').toLowerCase(), currentTags);
    for (x =0; x < currentTags.length; x++){
        if(currentTags[x] != 'project_child' && currentTags[x] != ticketExternalID.replace(/-/i, '_').toLowerCase()){
            newTagsString = newTagsString + " " +currentTags[x];
        }
    }
    return newTagsString;
}

var isValidEmail = function(address) {
     var reg = /^.+\@.+\..+$/;
     return reg.test(address);
   };

var ticketExternalID = '';
var skipUsers = {};
var skipGroup = {};
var orgListArray  = [];
var thelist = [];

//creates the mapping for various system values to their nice names
var statusList = { 0:"New", 1:"Open", 2:"Pending", 3:"Solved", 4:"Closed"};
var typeList = { 0:"None", 1:"Question", 2:"Incident", 3:"Problem", 4:"Task"};
var priorityList = { 0:"None", 1:"Low", 2:"Normal", 3:"High", 4:"Urgent"};
var getStatusList = function(statusValue) { return statusList[statusValue]; }
var gettypeList = function(typeValue) { return typeList[typeValue]; }
var getpriorityList = function(priorityValue) { return priorityList[priorityValue]; }
var formatDate = function(dateValue){ var newFormat = dateValue.split(" "); return newFormat[0]; }
var userTest = function(o){ if(!o) { return "None"; } return skipUsers[o]; }
var groupTest = function(o){ if(!o) { return "None"; } return skipGroup[o]; }



$j("#singlecheck").click(function(){
		if ($j("#singlecheck").is(":checked"))
		{
			$j(".singlecreate").show("fast");
		}
		else
		{
			$j(".singlecreate").hide("fast");
		}
	  });
$j("#bulkcheck").click(function(){
		if ($j("#bulkcheck").is(":checked"))
		{
			$j(".bulkcreate").show("fast");
		}
		else
		{
			$j(".bulkcreate").hide("fast");
		}
	  });
$j("#addcheck").click(function(){
		if ($j("#addcheck").is(":checked"))
		{
			$j(".addtickets").show("fast");
		}
		else
		{
			$j(".addtickets").hide("fast");
		}
	  });


$j('select#multi_org').multiselect({
            header: "Please select organization",
            selectedText: "# of # selected",
            selectedList: 1,
            minWidth: "200",
            height: "auto"
       });


       $j('select#single_group').multiselect({
                   header: "Please select group",
                   selectedText: "# of # selected",
                   selectedList: 1,
                   minWidth: "200",
                   height: "auto",
                   multiple: false
              });
			  
      GetOrgData = function(){
          $j.getJSON('/organizations.json?page='+ groupPageCount, function(skipgroupobj){
              if ( skipgroupobj.length !== 0) {
                  $j.each(skipgroupobj, function(i, item){
                      skipGroup[item.id] = item.name;
                         $j('select#multi_org').append('<option value="'+ item.id+'">'+item.name+'</option>');
                         $j('select#single_group').append('<option value="'+ item.id+'">'+item.name+'</option>');
                         $j('select#multi_org').multiselect("refresh");
                         $j('select#single_group').multiselect("refresh");
                      //console.log(item.name)
                  }
              );
                 groupPageCount = groupPageCount +1;
                 GetOrgData();
              } else {
                  return;
              }
         }
         );            
       }
       var GetOrgUser = function(orgID){
           $j.getJSON('/organizations/' + orgID + '/users.json?page='+ orgUserPageCount, function(skiporgobj){
               if ( skiporgobj.length !== 0) {
                   $j.each(skiporgobj, function(i, item){
                       createTicket(item.id);
                       console.log(item.id)
                   }
               );
                  orgUserPageCount = orgUserPageCount +1;
                  GetOrgUser(orgID);
               } else {
   			   orgUserPageCount = 1;
                   return;
               }
          }
          );            
        }
	
	
	
   	var createTicket = function(requestID){
           var rootTicket = {};
           rootTicket.ticket = {};
           //rootTicket.ticket.subject = $j('#ticket_title').text();
           rootTicket.ticket.subject = $j('#ticket_title').text() + ' - Sub-ticket of {{ticket.id}}';
           rootTicket.ticket['description'] = $j('#bulkTicketDesc').val();
           rootTicket.ticket.assignee_id = '{{current_user.id}}';
           rootTicket.ticket.requester_id = requestID;
           rootTicket.ticket.additional_tags = 'project_{{ticket.id}} project_child';
           rootTicket.ticket.fields = customFieldID;
           childCall = JSON.stringify(rootTicket);
           create_children(childCall);
          	}


$j('select#multi_org').change(function(){
          orgListArray = $j('select#multi_org').val();
          //console.log("after sel "+orgListArray);
          }

  );

  $j('select#single_group').change(function(){
            groupList = $j('select#single_group').val();
            //console.log("after sel "+orgListArray);
            }

    );


//pulls the groups and agents for display in sidebar widget 
var getData = function(){
    var deferreds = [];
    deferreds.push(GetOrgData());
    deferreds.push($j.getJSON('/users.json?role%5B%5D=4&role%5B%5D=2', function(skipuserobj){$j.each(skipuserobj, function(i, item) {skipUsers[item.id] = item.name;})}));  
    return $j.when.apply($, deferreds);
  }
	

var childrenSolved = function () {

        if (childTicket == -1){
           $j("#ticket_status_id option[value='3']").remove();
        }
   }




//get the external ID of the ticket you are viewing 
getData().done( function() {$j.getJSON('/tickets/{{ticket.id}}.json', function(extID){ ticketExternalID = extID.external_id; //newTags();
                if(ticketExternalID){
                 $j('#projectTag').append('Project ID: '+ ticketExternalID +'</br>');}
                  }).then(  
                      function(){ if(ticketExternalID){ 
                                   $j.getJSON('/search.json?query='+ticketExternalID, function(searchResults){ 
                                       $j.each(searchResults , function(i, item) {
                                          if (item.current_tags.indexOf('project_child') != -1 && item.status_id < 3){
                                             childrenSolved();
                                           };                                         
                                          var html = "<a href=\"/tickets\/" + item.nice_id + "\" target=\"_blank\"><b>Ticket: "+ item.nice_id+" >><\/b><\/a> "+item.subject+"<\/br>";
                                          html += "<b>Ticket Type:<\/b> "+ gettypeList(item.ticket_type_id) +"<\/br><b>Status:<\/b> "+ getStatusList(item.status_id) +"<\/br>";
                                          html += "<b>Group:<\/b> "+groupTest(item.group_id)+"<\/br><b>Assignee:<\/b> "+userTest(item.assignee_id)+"<\/br>";
                                          if(item.ticket_type_id === 4){  html += "<b>Due Date:<\/b> "+ formatDate(item.due_date) +"<\/br>";}
                                          html += "--------------------------------------------";
                                         if(item.current_tags.indexOf('project_parent') != -1){  $j('#projectParent').append(html); }
                                          else { $j('#projectTicket').append(html); }
                                });
                         });
                      }  
                     },
                      function(){ alert("$.get failed!"); }
         );

  });

    // This is the main bit of code, the action that occurs when the "Do" button is hit.
    // All other methods should be put into their own little section

    var current_callbacks = {};

    log_error = function(arg) {
        $('createtheproject_error').innerHTML = arg;
    }

    log_status = function(arg) {
        $('createtheproject_status').innerHTML = arg;
    }

    fade_status = function(arg) {
        setTimeout( function() {
            log_status('');
            log_error('');
        }, 6000);
    }
do_action = function() {

        var current_action = 'create_project';

        if (current_action) {
            var callback = current_callbacks[current_action];
            callback();
        }
    }


    Event.observe(document, 'widgets:load', function() {
        current_callbacks['not_yet'] = function() {
            log_status("Sorry, that function isn't done yet. :(");
            fade_status();
        }

        current_callbacks['create_project'] = do_update;

    });

//this adds the project tag to existing tickets 
attempt_create = function() {

          var apiCall = {};
          apiCall.ticket = {};
          apiCall.ticket.external_id = 'Project-{{ticket.id}}';
          apiCall.ticket.additional_tags = 'project_{{ticket.id}} project_child';
          apiCall.ticket.fields = customFieldID;

		  $j(''+ prjField +'').val('Project-{{ticket.id}}');
		  //update parent ticket 
		  ticketTagField.addEntry('project_parent');
           ticketTagField.addEntry('project_{{ticket.id}}');
		  var parentCall = {};
          parentCall.ticket = {};
          parentCall.ticket.external_id = 'Project-{{ticket.id}}';
          parentCall.ticket.additional_tags = 'project_parent project_{{ticket.id}}';
          parentCall.ticket.fields = customFieldID;
          parentcall = JSON.stringify(parentCall);
		  do_update('{{ticket.id}}', parentcall);
          var ticketListArray  = $j(ticketList).val().split(',');
          $j.each(ticketListArray, function(index, objectValue){
              $j.getJSON('/tickets/' + objectValue + '.json', function(data){
                        if (!data.external_id){
                            apiCall.ticket.subject = data.subject + ' - Sub-ticket of {{ticket.id}}';
                            call = JSON.stringify(apiCall);
                            do_update(data.nice_id, call);
                         } else {
                             log_error('ticket ' + data.nice_id + ' is part of another project');
                         }

              });
       }); 
};

//bulk creates tickets and assigns to groups 
attempt_children = function() {

          $j(''+ prjField +'').val('Project-{{ticket.id}}');
		  console.log(thelist);
          $j.each(orgListArray, function(index, objectValue){
			  orgUserPageCount = 1;
              GetOrgUser(objectValue);

       }); 
       var apiCall = {};
       apiCall.ticket = {};
       apiCall.ticket.external_id = 'Project-{{ticket.id}}';
       apiCall.ticket.additional_tags = 'project_parent project_{{ticket.id}}';
       call = JSON.stringify(apiCall);
       ticketTagField.addEntry('project_parent');
       ticketTagField.addEntry('project_{{ticket.id}}');
	   apiCall.ticket.fields = customFieldID;
	   do_update('{{ticket.id}}', call);
	   
}

//creates one child ticket with the project tag
attempt_child = function() {

              $j(''+ prjField +'').val('Project-{{ticket.id}}');
              var rootTicket = {};
               rootTicket.ticket = {};
               rootTicket.ticket.subject = $j('#ticketSubject').val();
               //rootTicket.ticket['description'] = $j('#ticketDesc').val() + "\n"+$j('#ticket_description').text();
               rootTicket.ticket['description'] = $j('#ticketDesc').val();
               rootTicket.ticket.requester_name = $j('#userName').val();
               rootTicket.ticket.requester_email = $j('#userEmail').val();
               rootTicket.ticket.group_id = groupList[0];
               rootTicket.ticket.external_id = 'Project-{{ticket.id}}';
               rootTicket.ticket.additional_tags = 'project_{{ticket.id}} project_child';
               rootTicket.ticket.fields = customFieldID;

               childCall = JSON.stringify(rootTicket);
              if(!isValidEmail($j('#userEmail').val())) { log_error('Please enter a proper email');  fade_status(); }
                else { create_children(childCall); }

			  ticketTagField.addEntry('project_parent');
              ticketTagField.addEntry('project_{{ticket.id}}');
			 var apiCall = {};
             apiCall.ticket = {};
             apiCall.ticket.external_id = 'Project-{{ticket.id}}';
             apiCall.ticket.additional_tags = 'project_parent project_{{ticket.id}}';
             apiCall.ticket.fields = customFieldID;
             call = JSON.stringify(apiCall);

            do_update('{{ticket.id}}', call);
     }

//removes one child ticket with the project tag
remove_child = function() {
      var rootTicket = {};
        rootTicket.ticket = {};
        rootTicket.ticket.external_id = '';
        rootTicket.ticket.fields = customFieldIDremove;
		rootTicket.ticket.set_tags = $j.trim(newTags());
        childCall = JSON.stringify(rootTicket);
        do_update('{{ticket.id}}', childCall);
        ticketTagField.removeEntry('project_child');
        ticketTagField.removeEntry(ticketExternalID.replace(/-/i, '_').toLowerCase());
        $j(''+ prjField +'').val(' ');

          }

//this adds the project tag to existing tickets 
do_update = function(ticketID, apiCall) {
                log_status('Starting...');

                 $j.ajax({
                   url: '/tickets/' + ticketID +'.json',
                   dataType: 'JSON',
                   type: 'PUT',
                   data: apiCall,
                   contentType: 'application/json',
                  statusCode: {
                     200: function() {
                         log_status("ticket " + ticketID + " updated");

                     }
                  },
                   success: function() { 
                    log_status("ticket " + ticketID + " updated");
                    fade_status();
                    // console.log("yes"); 
                       log_status("ticket " + ticketID + " updated");
                     /*$j(':input','#adhocProjectManagement')
                          .not(':button, :submit, :reset, :hidden')
                           .val('')
                          .removeAttr('checked')
                          .removeAttr('selected'); */
                      }

                 });        
}     

//creates new tickets with the project tags 
create_children = function(createCall) {
                log_status('Starting...');

                 $j.ajax({
                   url: '/tickets.json',
                   dataType: 'JSON',
                   type: 'POST',
                   data: createCall,
                   contentType: 'application/json',
                  statusCode: {
                     201: function() {
                         log_status("ticket created");
                          $j(':input','#adhocProjectManagement')
                          .not(':button, :submit, :reset, :hidden')
                           .val('')
                          .removeAttr('checked')
                          .removeAttr('selected'); 


                     }
                  },
                   success: function() { 
                    log_status("ticket " + ticketID + " created");
                    fade_status();
                    // console.log("yes"); 
                       log_status("ticket " + ticketID + " created");
                     /*$j(':input','#adhocProjectManagement')
                         .not(':button, :submit, :reset, :hidden')
                         .val('')
                          .removeAttr('checked')
                          .removeAttr('selected'); */
                      }

                 });        
}     


}());

</script>
