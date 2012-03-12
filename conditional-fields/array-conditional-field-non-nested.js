(function () {

/* This widget uses arrays to store the fields you which to show or hide based on a users selection
** Each field you wish to hide contains three fields that need to be hidden 
** 1) The title which is a H3 HTML tag. This uses jQuery to search for the title so make one entry in the array like this h3:contains(Division)
** 2) THe description (which is optional) that is a <P> HTML Tag. Like the title we do a searh for words in the description like this p:contains(Which Division) so add that to the next element in the array
** 3) The last bit that need to be in the array is the selector for the field which is like  #ticket_fields_20389132 the number being the ID of the custom field. 
**
** You need to create a array for each condition you wish to exist. aaa
*/

var creativeRequest = ['h3:contains(dental)', 'label:contains(dental)', '#ticket_fields_109934'];

var projectRequest = ['h3:contains(type2)', 'label:contains(type2)', '#ticket_fields_20111097'];


//the array the hides everything
var hideAll = [].concat(creativeRequest, projectRequest);

//condition fields for the end user request form make sure you change the field ID to yours. 
  $j(document).ready(function() {  
	//this builds a map based on the selection of the dropdown field values 
	moodFieldMap = {
	  alpha: [].concat(projectRequest),
	  angery_blue: [].concat(creativeRequest)
	}
    
    //function to hide a array of arrays 
       var hide = function(){
           $j.each(arguments, function(i, item){
               for(y = 0; y < item.length; y++){
                  $j(item[y]).hide();
               }
           }
               );
       }
       //function to show a array of arrays
       var show = function(){
              $j.each(arguments, function(i, item){
                  for(y = 0; y < item.length; y++){
                   $j(item[y]).show();
                  }
              }
                  );
       }

   //check to see if you are on the end users request page
  // if(location.pathname === '/requests/new' || location.pathname === '/anonymous_requests/new') {
   //hide all the fields
   hide(hideAll);

      //monitor the dropdown field
      $j('#ticket_fields_104609').change(function (){ 
         //grab the value of the dropdown
         var userSelection = $j('#ticket_fields_104609').val();
		 hide(hideAll);
         show(moodFieldMap[userSelection]);
         });
//    }

  });


}());