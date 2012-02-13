
<div class="form_element">
<label for="user_language">Select Language</label>
<div class="form_field">
<select id="user_locale_id" name="user[locale_id]"><option value="">Default (English)</option>
</select>
<p>Choose the language for the end user and click Update.</p>
</div>
</div>

<input id="submit-button" class="button primary" type="button" value="Update" onclick="submitLocaleID();" name="updatelocale">

<div style='padding: 4px; font-weight: bold; font-size: 18px;'>
    <div id='createtheproject_status'></div>
    <div id='createtheproject_error'></div>
</div>

<script>
(function() {
//builds the dropdown list
Buildoptions = {
       selected: function (value, name) {
           return '<option value="' + value + '" selected="selected">' + name + '</option>';
       },
       notselected: function (value, name) {
           return '<option value="' + value + '">' + name + '</option>';
       },
       clear: function () {
           return '<option value=""></option>';
       }
   };
   
   log_status = function(arg) {
       $('createtheproject_status').innerHTML = arg;
   }
//This call pulls the locale_id for the requester and selects it in the drop down.
 var localeIdUrlPrefix = "/api/v1/users/";
  $j.getJSON(localeIdUrlPrefix + {{ticket.requester.id}} + '.json', function(userLang) {
      var userCurrentLang = userLang.locale_id;
      $j.getJSON('/api/v2/locales', function(sysLang){
         var arrayOfLocales = null;
              // api v2 futureproof-ness
              if (typeof(sysLang.locales) === "undefined") {
                arrayOfLocales = sysLang;
              } else if (sysLang.locales) {
                arrayOfLocales = sysLang.locales;
              }
              $j.each(arrayOfLocales, function(i, item){
                   if (item.id == userCurrentLang) {
                          $j("select#user_locale_id").append(Buildoptions.selected(item.id, item.name));
                      } else {
                          $j("select#user_locale_id").append(Buildoptions.notselected(item.id, item.name));
                      }
              });
         
      });
  });

//This call uses the API to PUT the new language into the user profile and notifies the agent
selection = document.getElementById("user_locale_id");
submitLocaleID = function() {
$j.ajax({
  url: '/api/v1/users/' + {{ticket.requester.id}} +'.json',
  dataType: 'JSON',
  type: 'PUT',
    data: "{\"user\":{\"locale_id\":\"" + selection.value + "\"} }",
  contentType: 'application/json',
 statusCode: {
    200: function() {
        log_status('Requester language has been updated to: ' +     selection.options[selection.selectedIndex].text);
      } 
    },
  })
 };
}());
</script>
