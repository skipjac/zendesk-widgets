(function () {
    /*create the various options you want to display 
	**each array needs to be built out with even number of members
	**in a tag, title format. 
	*/
    var option1 = ['epic','Epic','story','Story'];
	var option2 = ['problem','Problem','task','Task'];
	var option3 = ['question','Question','incident', 'Incident'];
	var fieldOption1 = ['teeth', 'Teeth', 'gums','Gums' ]
	var fieldOption2 = ['molar', 'Molar', 'tonge', 'Tounge']
	
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
	    $j("select#ticket_fields_20111097").html(Buildoptions.clear());
	    makeSelection('select#ticket_fields_20111097',option3);
	    //watch the root field for changes 
	    $j('#ticket_fields_109934').change( function(endUserselect){
            //grab the value of the dropdown
            var userSelection = $j('#ticket_fields_109934').val();
		    if( userSelection === 'teeth') { 
		        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
			    makeSelection('select#ticket_fields_20111097',option2);
		    } 
		    if ( userSelection === 'gums' ) { 
		        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
			    makeSelection('select#ticket_fields_20111097',option1);
		    } 
		    if ( userSelection === 'tonge'){
			    $j("select#ticket_fields_20111097").html(Buildoptions.clear());
		        makeSelection('select#ticket_fields_20111097',option3);
		    }
		    if ( userSelection === 'molar'){
			    $j("select#ticket_fields_20111097").html(Buildoptions.clear());
		        makeSelection('select#ticket_fields_20111097',option1);
		    }
	    });
	    $j('select#ticket_group_id').change( function(agentSelect){
            //grab the value of the dropdown
            var userSelection = $j('select#ticket_group_id').val();
            console.log('in change' + userSelection);
		    if( userSelection === '48491') { 
		        $j("select#ticket_fields_109934").html(Buildoptions.clear());
			    makeSelection('select#ticket_fields_109934',fieldOption2);
		    } else if ( userSelection === '81995' ) { 
		        $j("select#ticket_fields_109934").html(Buildoptions.clear());
			     makeSelection('select#ticket_fields_109934',fieldOption1);
		    }
	    });
    
    if(location.pathname.indexOf('tickets') >= 1) {
        $j('select#ticket_fields_109934').html(Buildoptions.clear());
        //default options when page 1st loads 
	    console.log(document.location.pathname);
	    $j.getJSON(document.location.pathname, function(ticketData){
	            console.log('ticket groupid ' + ticketData.group_id);
	            
	            $j.each(ticketData.ticket_field_entries, function(i, item){
	               if ( item.ticket_field_id === 109934) {
	                    if( item.value === 'teeth' ) { 
	                        $j('select#ticket_group_id').val('81995');
	                        $j('select#ticket_group_id').change();
	                        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
	                        makeSelection('select#ticket_fields_20111097',option2);
	                    }
	                    if ( item.value === 'gums'){
	                        $j('select#ticket_group_id').val('81995');
	                        $j('select#ticket_group_id').change();
	                        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
            			    makeSelection('select#ticket_fields_20111097',option1);
	                    }
	                    if ( item.value === 'molar'){
	                        $j('select#ticket_group_id').val('48491');
	                        $j('select#ticket_group_id').change();
	                        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
	                        makeSelection('select#ticket_fields_20111097',option1);
	                    }
	                    if ( item.value === 'tonge'){
	                        $j('select#ticket_group_id').val('48491');
	                        $j('select#ticket_group_id').change();
	                        $j("select#ticket_fields_20111097").html(Buildoptions.clear());
	                        makeSelection('select#ticket_fields_20111097',option3);
	                    }
	                    $j('#ticket_fields_109934').val(item.value)
	               }
	               if ( item.ticket_field_id === 20111097) {
                       console.log('20111097 ' + item.value)        
   	                $j('#ticket_fields_20111097').val(item.value)
   	               }
                   
                    
	            });
	       }
	    );
    }
}());