/* This widget uses arrays to store the fields you which to show or hide based on a users selection
** Each field you wish to hide contains three fields that need to be hidden 
** 1) The title which is a H3 HTML tag. This uses jQuery to search for the title so make one entry in the array like this h3:contains(Division)
** 2) THe description (which is optional) that is a <P> HTML Tag. Like the title we do a searh for words in the description like this p:contains(Which Division) so add that to the next element in the array
** 3) The last bit that need to be in the array is the selector for the field which is like  #ticket_fields_20389132 the number being the ID of the custom field. 
**
** You need to create a array for each condition you wish to exist. 
*/

//the arrays for the work flow you wish
var net_type = ['h3:contains(Service Type)','#ticket_fields_20665618'];
var net_access = ['h3:contains(Access)','#ticket_fields_20666781', 'h3:contains(Direction)','#ticket_fields_20672447','h3:contains(Network Port)','#ticket_fields_20672442','h3:contains(Source IP)','#ticket_fields_20666786','h3:contains(Destination IP)','#ticket_fields_20666143'];
var net_dns = ['h3:contains(DNS Name)','#ticket_fields_20666796', 'h3:contains(Network IP Address)','#ticket_fields_20666791', 'h3:contains(Alias)','#ticket_fields_20672522'];
var net_interuuption = ['h3:contains(Interuption)','#ticket_fields_20666996'];
var net_expanding = ['h3:contains(more users)','#ticket_fields_20666801','h3:contains(how long)','#ticket_fields_20666806','h3:contains(moving/expanding )','#ticket_fields_20672532','#ticket_fields_20666811','h3:contains(Moving/expanding )'];
//this is for the agent interface because it uses labels instead of h3 elements
var net_type_agent = ['label:contains(Networking Type)'];
var net_access_agent = ['label:contains(Access)','label:contains(Direction)','label:contains(Network Port)', 'label:contains(Source IP)','label:contains(Destination IP)'];
var net_dns_agent =['label:contains(DNS Name)','label:contains(Network IP Address)','label:contains(Alias)',];
var net_interuuption_agent = ['label:contains(Interuption)'];
var net_expanding_agent = ['label:contains(more users)','label:contains(how long)','label:contains(moving/expanding)','label:contains(Moving/expanding)']
//this is for the pending status field
var pending_status = ['label:contains(Pending Status)', '#ticket_fields_20701212']
//this is for the telephony selections 
var tel_type = ['h3:contains(Telephony)','#ticket_fields_20694826'];
var tel_type_agent = ['label:contains(Telephony Type)'];
var tel_voicemail = ['h3:contains(Telephone Number)','h3:contains(Mailbox Number)','h3:contains(last successful login)', '#ticket_fields_20696238', '#ticket_fields_20697721', '#ticket_fields_20705192', '#ticket_fields_20697796'];
var tel_voicemail_agent = ['label:contains(Telephone Number)','label:contains(Mailbox Number)','label:contains(last successful login)'];
//condition fields for the end user request form make sure you change the field ID to yours. 
$j(document).ready(function() {  

    for(i = 0; i < net_type.length; i++){ $j(net_type[i]).hide();}
    for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
    for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide();}
    for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
    for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
    for(i = 0; i < net_type_agent.length; i++){ $j(net_type_agent[i]).hide(); }
    for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
    for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
    for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
    for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
    for(i = 0; i < pending_status.length; i++){ $j(pending_status[i]).hide(); }
    for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
    for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
    for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
    for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }


    //monitor the status field and look for pending to show the pending status field 
      $j('#ticket_status_id').change(function(endUserselect){
          var userSelection = $j('#ticket_status_id').val();
          console.log(userSelection); 
          if(userSelection == 2){
              for(i = 0; i < pending_status.length; i++){ $j(pending_status[i]).show(); }
              } else {
                  for(i = 0; i < pending_status.length; i++){ $j(pending_status[i]).hide(); }
              }
          });//<--! end of status montior --> 
      //monitor the What is your issue? dropdown field
      $j('#ticket_fields_20665438').change(function(endUserselect){
          //grab the value of the dropdown
          var userSelection = $j('#ticket_fields_20665438').val();
          console.log(userSelection);
         if(userSelection === 'network_services') { 
             for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
             for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
             for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
             for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
             for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
             for(i = 0; i < net_type_agent.length; i++){ $j(net_type_agent[i]).show(); }
             for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
             for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
             for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
             for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
             for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
             for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
             for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
             for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

          }
          if(userSelection === 'telephony') { 
               for(i = 0; i < net_type.length; i++){ $j(net_type[i]).hide(); }
               for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
               for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
               for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
               for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
               for(i = 0; i < net_type_agent.length; i++){ $j(net_type_agent[i]).hide(); }
               for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
               for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
               for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
               for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
               for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).show(); }
                for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).show(); }
                for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

            }
          if(userSelection === '') { 
              for(i = 0; i < net_type.length; i++){ $j(net_type[i]).hide(); }
              for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
              for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
              for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
              for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
              for(i = 0; i < net_type_agent.length; i++){ $j(net_type_agent[i]).hide(); }
              for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
              for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
              for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
              for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
              for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
               for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
               for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
               for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

            }

         });//<!-- What is your issue -->

         //monitor the network type dropdown field
           $j('#ticket_fields_20665618').change(function(endUserselect){
               //grab the value of the dropdown
               var userSelection = $j('#ticket_fields_20665618').val();
               console.log(userSelection);
              if(userSelection === 'net_access') { 
                  for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                  for(i = 0; i < net_access.length; i++){ $j(net_access[i]).show(); }
                  for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                  for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                  for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                  for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).show(); }
                  for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                  for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                  for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                  for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                  for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                  for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                  for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

               }
               if(userSelection === 'net_dns_entry') { 
                     for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                     for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                     for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).show(); }
                     for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                     for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                     for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                     for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).show();}
                     for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                     for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                     for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                     for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                     for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                     for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                  }
                if(userSelection === 'net_service_interuption') { 
                    for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                    for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                    for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                    for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).show(); }
                    for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                    for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                    for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                    for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).show(); }
                    for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                    for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                    for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                    for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                    for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                  }
                  if(userSelection === 'net_troubleshooting_analysis') { 
                      for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                      for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                      for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                      for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                      for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                      for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                      for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                      for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                      for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                      for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                      for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                      for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                      for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                    }
                    if(userSelection === 'net_expanding_capacity') { 
                        for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                        for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                        for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                        for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                        for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).show(); }
                        for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                        for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                        for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                        for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).show(); }
                        for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                        for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                        for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                        for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                      }
                      if(userSelection === '') { 
                          for(i = 0; i < net_type.length; i++){ $j(net_type[i]).show(); }
                          for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                          for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                          for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                          for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                          for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                          for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                          for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                          for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                          for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).hide(); }
                          for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).hide(); }
                          for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                          for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                        }



              });//<!--monitor the network type dropdown field -->

          // monitior telephony type selection
             $j('#ticket_fields_20694826').change(function(endUserselect){
                  //grab the value of the dropdown
                   var userSelection = $j('#ticket_fields_20694826').val();
             if(userSelection === 'tel_voicemail_resets') { 
                   for(i = 0; i < net_type.length; i++){ $j(net_type[i]).hide(); }
                   for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                   for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                   for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                   for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                   for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                   for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                   for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                   for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                   for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).show(); }
                   for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).show(); }
                   for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).show(); }
                   for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).show(); }

                 }
             if(userSelection === '') { 
                   for(i = 0; i < net_type.length; i++){ $j(net_type[i]).hide(); }
                   for(i = 0; i < net_access.length; i++){ $j(net_access[i]).hide(); }
                   for(i = 0; i < net_dns.length; i++){ $j(net_dns[i]).hide(); }
                   for(i = 0; i < net_interuuption.length; i++){ $j(net_interuuption[i]).hide(); }
                   for(i = 0; i < net_expanding.length; i++){ $j(net_expanding[i]).hide(); }
                   for(i = 0; i < net_access_agent.length; i++){ $j(net_access_agent[i]).hide(); }
                   for(i = 0; i < net_dns_agent.length; i++){ $j(net_dns_agent[i]).hide();}
                   for(i = 0; i < net_interuuption_agent.length; i++){ $j(net_interuuption_agent[i]).hide(); }
                   for(i = 0; i < net_expanding_agent.length; i++){ $j(net_expanding_agent[i]).hide(); }
                   for(i = 0; i < tel_type.length; i++){ $j(tel_type[i]).show(); }
                   for(i = 0; i < tel_type_agent.length; i++){ $j(tel_type_agent[i]).show(); }
                   for(i = 0; i < tel_voicemail.length; i++){ $j(tel_voicemail[i]).hide(); }
                   for(i = 0; i < tel_voicemail_agent.length; i++){ $j(tel_voicemail_agent[i]).hide(); }

                 }
         });//<!-- end of telephony type 

});


Event.observe(window, 'load', function() {
    if(location.pathname.indexOf('tickets') >= 1) {
        $j('#ticket_status_id').change();
        $j('#ticket_fields_20665438').change();
        if($j('#ticket_fields_20665438').val() === 'network_services'){
             $j('#ticket_fields_20665618').change();
         }

    }
});