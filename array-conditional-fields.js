var creative_request = ['h3:contains(Division)','p:contains(Which Division)','#ticket_fields_20389132','h3:contains(Phone Number)','#ticket_fields_20389182','h3:contains(Request Type)','p:contains(or On-going)','#ticket_fields_20388673','h3:contains(Contact Name)','#ticket_fields_20391371','h3:contains(Additional Notes)','p:contains(please provide justification)','#ticket_fields_20391376'];

var project_request = ['h3:contains(No Revenue)','p:contains(no revenue)','#ticket_fields_20392967','h3:contains(Websites)','p:contains(verticals does this project)','#ticket_fields_20392977','h3:contains(Channels)','p:contains(Identify any channel)','#ticket_fields_20392982','h3:contains(Other Departments)','p:contains(how other departments)','#ticket_fields_20392987','h3:contains(Status Tracking)','p:contains(stats tracking requirements)','#ticket_fields_20392992','h3:contains(Internal Platform)','p:contains(being built internally)','#ticket_fields_20395556','h3:contains(Reporting Requirements)','p:contains(specific reporting requirements)','#ticket_fields_20395561','h3:contains(Standard Ad Units)','p:contains(standard in page)','#ticket_fields_20395566','h3:contains(Wallpaper)','p:contains(if wall paper is)','#ticket_fields_20395571','h3:contains(Video)','p:contains(incorporating video)','#ticket_fields_20395576','h3:contains(Third Party)','p:contains(third party involvement)','#ticket_fields_20395581','h3:contains(Domain Name)','p:contains(DNS change)','#ticket_fields_20395586','h3:contains(Required Departments)','#ticket_fields_20395591','h3:contains(Technical Specs)','p:contains(Technical Specs)','#ticket_fields_20395596','h3:contains(Project Contact)','p:contains(Enter Contact Name)','#ticket_fields_20392048','h3:contains(Project type)','#ticket_fields_20392053','h3:contains(Project Name)','p:contains(Enter the project name)','#ticket_fields_20395381','h3:contains(Success Criteria)','p:contains(measure the success)','#ticket_fields_20392058','h3:contains(Sponsor Phone)','#ticket_fields_20392063','h3:contains(Sponsor Department)','#ticket_fields_20392068','h3:contains(Project Milestones)','p:contains(milestones for the project)','#ticket_fields_20392073','h3:contains(Nonprofit)','p:contains(is for charity or a nonprofit group)','#ticket_fields_20392078','h3:contains(Indirect Revenue)','p:contains(any indirect revenue)','#ticket_fields_20392083','h3:contains(Content Location)','p:contains(built internally or if it is a 3rd Party)','#ticket_fields_20392088','h3:contains(Intersitials)','p:contains(Identify if interstitials)','#ticket_fields_20392093','h3:contains(Sponsor email)','#ticket_fields_20395421','h3:contains(Is due date flexible)','#ticket_fields_20395426','h3:contains(Affected URL)','p:contains(URL of affected)','#ticket_fields_20392133','h3:contains(If the due date not flexible)','p:contains(An ad campaign running)','#ticket_fields_20395466','h3:contains(Project Background)','p:contains(The background of the Project)','#ticket_fields_20392932','h3:contains(Project Benefits)','p:contains(outline of what the benefits are)','#ticket_fields_20392937','h3:contains(Consumer Need)','p:contains(consumer will this project satisfy)','#ticket_fields_20392942','h3:contains(Estimated Revenue)','#ticket_fields_20395506','h3:contains(Project Objectives and Deliverables)','p:contains(specific objectives for the project)','#ticket_fields_20392947','h3:contains(Sponsors Name)','#ticket_fields_20392952','h3:contains(Sponsor location)','#ticket_fields_20392957'];


var date_fields = ['h3:contains(Date Required)','#ticket_fields_20389142','h3:contains(Requested date)','#ticket_fields_20388678'];
var common_fields = ['h3:contains(Priority)','p:contains(Request priority)','#ticket_priority_id','h3:contains(Description)','p:contains(Thoroughly describe)','#comment_value'];




//condition fields for the end user request form make sure you change the field ID to yours. 
$j(document).ready(function() {  

   //check to see if you are on the end users request page
   if(location.pathname === '/requests/new' || location.pathname === '/anonymous_requests/new') {

    for(i = 0; i < creative_request.length; i++){ $j(creative_request[i]).hide(); }
    for(i = 0; i < project_request.length; i++){ $j(project_request[i]).hide(); }
    for(i = 0; i < date_fields.length; i++){ $j(date_fields[i]).hide(); }
    for(i = 0; i < common_fields.length; i++){ $j(common_fields[i]).hide(); }

      //monitor the dropdown field
      $j('#ticket_fields_20381732').bind('change.ticketTagger', function(endUserselect){
          //grab the value of the dropdown
          var userSelection = $j('#title-tagger-20381732').text();
         if(userSelection === 'Project Request') { 
             for(i = 0; i < creative_request.length; i++){ $j(creative_request[i]).hide(); }
             for(i = 0; i < project_request.length; i++){ $j(project_request[i]).show(); }
             for(i = 0; i < date_fields.length; i++){ $j(date_fields[i]).show(); }
             for(i = 0; i < common_fields.length; i++){ $j(common_fields[i]).show(); }

          }


          if(userSelection === 'Creative Request'){  
              for(i = 0; i < creative_request.length; i++){ $j(creative_request[i]).show(); }
              for(i = 0; i < project_request.length; i++){ $j(project_request[i]).hide(); }
              for(i = 0; i < date_fields.length; i++){ $j(date_fields[i]).show(); }
              for(i = 0; i < common_fields.length; i++){ $j(common_fields[i]).show(); }

          }
          if(userSelection !== 'Creative Request' && userSelection !== 'Project Request')  {
             for(i = 0; i < creative_request.length; i++){ $j(creative_request[i]).hide(); }
              for(i = 0; i < project_request.length; i++){ $j(project_request[i]).hide(); }
              for(i = 0; i < date_fields.length; i++){ $j(date_fields[i]).show(); }
              for(i = 0; i < common_fields.length; i++){ $j(common_fields[i]).show(); }
         }




         });
    }

});
