(function () {
    /*create the various options you want to display 
	**each array needs to be built out with even number of members
	**in a tag, title format. 
	*/
    var option1 = ['epic','Epic','story','Story'];
	var option2 = ['problem','Problem','task','Task'];
	var option3 = ['question','Question','incident', 'Incident'];
	
	//this biulds the dropdown list
    Buildoptions = {
        selected: function(value, name){ 
            return '<option value="'+value+'" selected="selected">'+name+'</option>';
        },
        notselected: function(value, name){
            return '<option value="'+value+'">'+name+'</option>';
        },
        clear: function(){
            return '<option value=""></option>';
        }
    }
	//goes through the selected array and builds the options 
	var makeSelection = function(theArray) {
	        for ( x = 0; x < theArray.length; x = x + 2) {
                $j("select#ticket_fields_20111097").append(Buildoptions.notselected(theArray[x], theArray[x + 1]));
	        }
	    }
	//if on end user ticket page 
	if(location.pathname === '/requests/new' || location.pathname === '/anonymous_requests/new') {
        //default options when page 1st loads 
	    $j("select#ticket_fields_20111097").html(Buildoptions.clear());
	    makeSelection(option3);
	
	    //watch the root field for changes 
	    $j('#ticket_fields_109934').change( function(endUserselect){
            //grab the value of the dropdown
            var userSelection = $j('#ticket_fields_109934').val();
		    if( userSelection === 'teeth') { 
		        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
			    makeSelection(option2);
		    } else if ( userSelection === 'gums' ) { 
		        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
			    makeSelection(option1);
		    } else {
			    $j("select#ticket_fields_20111097").html(Buildoptions.clear());
		        makeSelection(option3);
		    }
	    });
    }
}());