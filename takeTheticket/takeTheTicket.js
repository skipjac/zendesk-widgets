<div id='stealtheticket'>
    <input type='button' value='Take the Ticket' onclick='do_action();'>
    <div style='padding: 4px; font-weight: bold; font-size: 18px;'>
        <div id='stealtheticket_status'></div>
        <div id='stealtheticket_error'></div>
    </div>
</div>

<script type="javascript">
    // This is the main bit of code, the action that occurs when the "Do" button is hit.
    // All other methods should be put into their own little sections
    var current_callbacks = {};

    log_error = function(arg) {
        $('stealtheticket_error').innerHTML = arg;
    }

    log_status = function(arg) {
        $('stealtheticket_status').innerHTML = arg;
    }

    fade_status = function(arg) {
        setTimeout( function() {
            log_status('');
        }, 3000);
    }
do_action = function() {

        var current_action = 'steal_ticket';

        if (current_action) {
            var callback = current_callbacks[current_action];
            callback();
        }
    }


    Event.observe(window, 'widgets:load', function() {
        current_callbacks['not_yet'] = function() {
            log_status("Sorry, that function isn't done yet. :(");
            fade_status();
        }

        current_callbacks['steal_ticket'] = attempt_steal;

    });

    get_current_user_id = function() {
        var _current_user_id = 0;
        agents.each( function(row) {
            if (row['name'] == "{{current_user.name}}") {
                _current_user_id = row['id'];
            }
        });
        return _current_user_id;
    }

</script>


<script type="javascript">
    // this is all the code for the ticket stealing function.
    var ticket_id = ticketId;
    var can_update_ticket = false;
    var assignee_name = 'Unknown';

    attempt_steal = function() {
        log_status("Checking one last time...");
        check_on_ticket(function() {
            do_steal();
        });
    }
    
    var rootTicket = {};
        rootTicket.ticket = {};
        rootTicket.ticket.assignee_id = currentUser.id;
    var childCall = JSON.stringify(rootTicket);

    do_steal = function() {
        log_status('Starting...');

        var do_it = false;
        if (can_update_ticket == false) {
            do_it = confirm("This ticket is already owned by " + assignee_name + "\n\nClicking OK will assign this ticket to you.");
        } else {
            do_it = true;
        }

        if (do_it) { 
            $j.ajax('/api/v1/tickets/' + ticket_id + '.json', {
                type:'PUT',
                contentType: "application/json",
                accepts: "application/json",
                data: childCall,
                statusCode: {
                  200: function(){
              log_status("Owner = You");
              fade_status();
            }
                }
            });            
        }
    }

    check_on_ticket = function(cb_on_success) {
        log_status("Attempting to find owner.");

        new Ajax.Request('/tickets/' + ticket_id + '.json', {
            method:'GET',
            asynchronous: true,
            onSuccess: function(transport) {
                var obj = transport.responseText.evalJSON();
                ticket_id = obj['nice_id'];
                assignee_name = 'None';

                agents.each( function(row) {
                    if (row['id'] == obj['assignee_id']) {
                        assignee_name = row['name'];
                    }
                });

                log_status("Current Owner: " + assignee_name);

                if (assignee_name == 'None') {
                    can_update_ticket = true;
                } else {
                    can_update_ticket = false;
                }

                if (cb_on_success !== undefined) {
                    cb_on_success();
                }
            },
            onException: function(transport) {
                log_error('exception: ' + transport.responseText);
            },
            onFailure: function(transport) {
                log_error('failure: ' + transport.responseText);
            }
        });
    }

</script>