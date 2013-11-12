(function() {

    $j(document).ready(function() {  

       //check to see if you are on the end users request page
       if(location.pathname === '/requests/new' || location.pathname === '/anonymous_requests/new') {
           $j('div#widget_fixed').hide();
       }
    });
}());
