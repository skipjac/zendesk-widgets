(function() {
    if ( currentUser.email === 'invalid@example.com' ) { 
        $j('.clazz.tab_new').hide();
        $j('.clazz.tab_requests').hide();
    }

}());