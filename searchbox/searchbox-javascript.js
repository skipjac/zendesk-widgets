//Create the class for the home page search box
//$j('#query').attr('placeholder', 'Search the Forums for answers');
var $search = $j('#suggest_form').addClass('overlay');

//if there is a value in the forum search get it before rebuilding the HTML
var $searchTest = $j('#searchform').find('input').val();
//Create the Class for the forum search box
var $forumSearch = $j('#searchform').addClass('formoverlay');

//Create the HTML for the new Home page search box 
var suggestFormHtml = "<label for=\"suggestions_query\">Search the Forums for answers</label>";
suggestFormHtml += "<input id=\"suggestions_query\" name=\"suggestions_query\" type=\"text\">";
suggestFormHtml += "<input value =\"1\" name=\"page\" type=\"hidden\">";
suggestFormHtml += "<input value =\"3\" name=\"per_page\" type=\"hidden\">";

//Create the HTML for the new Forum search box
var searchFormHtml = "<label for=\"query\">Search the Forums for answers</label>";
searchFormHtml += "<input class=\"title\" id=\"query\" name=\"query\" type=\"text\" value=\"" + $searchTest + "\">";
searchFormHtml += "<input id=\"for_search\" name=\"for_search\"  type=\"hidden\" value =\"1\" >";

//Overwrite the old HTML with the ones created above. 
$j('form#searchform').html(searchFormHtml);
$j('form#suggest_form').html(suggestFormHtml);

//Look for the labels for the Home page search box 
var $searchInput = $search.find('input');
var $searchLabel = $search.find('label');

//Look for the labels for the Forum page search box 
var $forumSearchInput = $forumSearch.find('input');
var $forumSearchLabel = $forumSearch.find('label');
//test to see if there was a previous Forum page search and hide the label is so  
if ($forumSearchInput.val()) { $forumSearchLabel.hide(); }


//Hide the home page search box label when clicked 
$searchInput.focus(function () { $searchLabel.hide(); })
           .blur(function() { if (this.value =='') { $searchLabel.show();}
          });
$searchLabel.click(function () { $seachInput.trigger('foucs');});

//Hide the forum page search box label when clicked 
$forumSearchInput.focus(function () { $forumSearchLabel.hide(); })
            .blur(function() { if (this.value =='') { $forumSearchLabel.show();}
         });
$forumSearchLabel.click(function () { $forumSearchInput.trigger('foucs');});
