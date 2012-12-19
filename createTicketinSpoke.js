<div id='createtheticket'>
<div class="select" style>
    <label for="zendeskSelect">Select Spoke Account</label>
     <select id="zendeskSelect" name="zendeskSelect" onchange style="width: auto;">
          <option value="-">-</option>
          <option value="sutoka.techassistant.net">Germany</option>
     </select>

<ol>
    <li>
      <label for="userName">Name</label>
       <span> (required) </span>
       <input class="required" type="text" name="userName" id="userName" style="width: 196px" />
      </li>
     <li>
        <label for="userEmail">Email</label>
         <span> (required) </span>
         <input class="required" type="text" name="userEmail" id="userEmail" style="width: 196px"  />
      </li>
      <li>
          <label for="ticketSubject">Subject</label>
           <span> (required) </span>
          <input class="required" type="text" name="ticketSubject" id="ticketSubject" style="width: 196px" />
       </li>
       <li>
          <label for="ticketDesc">Description<label>
           <span> (required) </span> 
          <textarea class="required" rows="10" name="ticketDesc" id="ticketDesc" style="width: 196px"> </textarea>
        </li>
     </ul>
    </div>
    <input type='button' value='CreateTicket' onclick='attempt_create();'>
    <div style='padding: 4px; font-weight: bold; font-size: 18px;'>
        <div id='createtheticket_status'></div>
        <div id='createtheticket_error'></div>
    </div>
</div>


<script type="javascript">
    // This is the main bit of code, the action that occurs when the "Do" button is hit.
    // All other methods should be put into their own little sections
(function () {
var isValidEmail = function(address) {
     var reg = /^.+\@.+\..+$/;
     return reg.test(address);
   };

    var current_callbacks = {};

    log_error = function(arg) {
        $('createtheticket_error').innerHTML = arg;
    }

    log_status = function(arg) {
        $('createtheticket_status').innerHTML = arg;
    }

    fade_status = function(arg) {
        setTimeout( function() {
            log_status('');
            log_error('');
        }, 6000);
    }
do_action = function() {

        var current_action = 'create_ticket';

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

        current_callbacks['create_ticket'] = do_create;

    });

attempt_create = function() {
          testEmail = $j('#userEmail').val();

          if($j('#zendeskSelect').val() === '-') { log_error('Please select a spoke');  fade_status(); }
           else if($j('#userName').val() === '') { log_error('Please enter a user name');   fade_status();}
           else if(!isValidEmail($j('#userEmail').val())) { log_error('Please enter a proper email');  fade_status(); }
           else if($j('#ticketSubject').val() === '') { log_error('Please enter a subject');  fade_status();}
           else if($j('#ticketDesc').val() === '') { log_error('Please enter a description');  fade_status(); }
          else { do_create(); }
}



do_create = function() {
                log_status('Starting...');

                 $j.ajax({
                   url: '/proxy/direct?url=http://'+$j('#zendeskSelect').val()+'/requests/embedded/create.json?subject='+ encodeURI($j('#ticketSubject').val())+'%26description='+encodeURI($j('#ticketDesc').val())+'%26name='+encodeURI($j('#userName').val())+'%26email='+ encodeURI($j('#userEmail').val()),
                   dataType: 'JSON',
                   type: 'GET',
                    contentType: 'application/json',
                   success: function(Object) { 
                    log_status(Object.message);
                    fade_status();
                    //console.log(arguments); 
                     $j(':input','#createtheticket')
                          .not(':button, :submit, :reset, :hidden')
                           .val('')
                          .removeAttr('checked')
                          .removeAttr('selected');
                      },
                   error: function(Object) { log_error('exception: ' + Object.error); 
                   console.log(arguments); 
                     }
                 });        
}   
}());  
</script>

