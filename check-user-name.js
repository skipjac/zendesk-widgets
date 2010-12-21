//this widget checks the user name to see if it has a prefix and hide the submit button if it does 
$j(document).ready(function() {  
   //check to see if you are on the registration page
   if (window.location.href.indexOf('registration') >= 0) {
      //hide the recaptcha and submit button
      $j('.action-login').hide();
      $j('div#recaptcha_widget').hide();
      //check the name when the move to the next field.
      $j('input#user_name.text').blur(function() {
            //the regex for the expression you are checking for in this case [GM]
            var gmTest =  /^\[GM\]/;
            if (!gmTest.test(this.value)) {  $j('.action-login').show();  $j('div#recaptcha_widget').show();}
            else { alert("Please select a name that doesn't\n begin with [GM]");
                  $j('.action-login').hide();
                  $j('div#recaptcha_widget').hide(); 
                }
          });

    }
  //check to see if you are on the user profile page
   else  if (window.location.href.indexOf('users') >= 0) {
           $j('input#user_name').blur(function() {
            var gmTest =  /^\[GM\]/;
            if (gmTest.test(this.value)) {  
                   $j('input#submit-button').hide();
                   alert("Please select a name that doesn't\n begin with [GM]")
               }
            else {
                   $j('input#submit-button').show();
                }
          });



}

});
