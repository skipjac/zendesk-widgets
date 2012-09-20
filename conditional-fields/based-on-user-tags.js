(function () {
    /*create the various options you want to display 
	**each array needs to be built out with even number of members
	**in a tag, title format. 
	*/
  var option1 = ['alpha','alpha1','angery_blue','Angery/blue'];
	var option2 = ['beepling_computer','Beepling Computer','depressed','depressed'];
	var option3 = ['happy_glad','Happy, glad','sad', 'Sad'];
	var fieldOption1 = ['twitter', 'Twitter', 'hulu','hulu' ]
	var fieldOption2 = ['mouth', 'teeth']
	
	//this builds the dropdown list
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
	var makeSelection = function(theField, theArray) {
	        for ( x = 0; x < theArray.length; x = x + 2) { console.log('makeing select ' + theArray)
                $j(''+ theField +'').append(Buildoptions.notselected(theArray[x], theArray[x + 1]));
	        }
	    }

        //default options when page 1st loads 
	    $j("select#ticket_fields_104609").html(Buildoptions.clear());
	    makeSelection('select#ticket_fields_104609',option3);
	    //watch the root field for changes 
	    $j(document).ready(function() {  
            //grab the value of the dropdown
            var userTags = currentUser.tags;
		    if( _.include(userTags, 3) ) { 
			    makeSelection('select#ticket_fields_104609',option2);
		    } 
		    if ( _.include(userTags, 'option1') ) { 
			    makeSelection('select#ticket_fields_104609',option1);
		    } 
		    if ( _.include(userTags, 3) ){
		        makeSelection('select#ticket_fields_104609',option3);
		    }
		    if ( _.include(userTags, 3) ){
		        makeSelection('select#ticket_fields_104609',option1);
		    }
	    });
}());