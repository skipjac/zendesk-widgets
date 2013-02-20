(function () {

var userTags = currentUser.tags;
//These are the fields to hide or show:
var headStartPlatform = [$j('#ticket_fields_22256522').parent()],
	headStartVersion = [$j('#ticket_fields_22278318').parent()],
	appStudioPlatform = [$j('#ticket_fields_22278328').parent()],
	appStudioVersion = [$j('#ticket_fields_22278876').parent()],
	productField = ['#ticket_fields_22279527'];

//the array that hides everything
var productConditionals = [].concat(headStartPlatform, headStartVersion, appStudioPlatform, appStudioVersion);
var allConditionals = [].concat(productConditionals, productField);

//condition fields for the end user request form make sure you change the field ID to yours. 
	$j(document).ready(function() {  

		//this builds a map based on the selection of the dropdown field values 
		tagMap = {
		  	test: [].concat(appStudioVersion, appStudioPlatform),
		  	test1: [].concat(headStartVersion, headStartPlatform)
		};

    
    	//function to hide an array of arrays 
		var hide = function(){
			$j.each(arguments, function(i, item){
				for(y = 0; y < item.length; y++){
		     	$j(item[y]).hide();
		     }
				});
		};

		//function to show an array of arrays
		var show = function(){
			if ( arguments[0] ) {
		  	$j.each(arguments, function(i, item){
		     	for(y = 0; y < item.length; y++){
		        	$j(item[y]).show();
		        }
		  	});
			}
		};

		//hide all the fields
		hide(allConditionals);
		if (userTags.include("test") && userTags.include("test1")){
			show(productField);
		}
		else if (userTags.include("test")){
			show(tagMap["test"]);
		}
		else if (userTags.include("test1")){
			show(tagMap["test1"]);
		} else { show(tagMap["appstudio_product"]);}

		$j('#ticket_fields_22279527').change(function(){
			var userSelection = $j('#ticket_fields_22279527').val();
			hide(productConditionals);  
			if (userSelection.length > 0) show(tagMap[userSelection]);
			});

	});


}());
