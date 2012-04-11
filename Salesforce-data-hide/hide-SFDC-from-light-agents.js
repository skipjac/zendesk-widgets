(function($) {

 Event.observe(document, 'widgets:load', function() { 
     var roleID = 294407;
     $.ajax({
       url:  '/users/current.json',
       success: function(data) {
        if ( data.custom_role_id  === roleID){
           $('#crm_user_data').css("visibility", "hidden");
        }
       }
     });
    

   }
);
}(jQuery));