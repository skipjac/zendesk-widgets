{% case current_user.language %}
{% when 'English' %}  	
<b>Support Center</b><p>
Support hours: 7 a.m. - 7 p.m., Eastern Time<p>
> Create a new <a href="http://support..ca/tickets/new">support ticket</a>.<p>
> Send us an <a href="mailto:support@.ca">email</a>.<p>
> Call us at 1

{% when 'Français' %}
<b>Centre de Soutien  </b><p>
Heures de soutien : 7h - 19h, heure normale de l'est.<p>
> Nouveau <a href="http://support..ca/tickets/new">ticket de soutien</a>.<p>
> Envoyez-nous un <a href="mailto:soutien@.ca">courriel</a>.<p>
> Appelez-nous au 1

{% endcase %} 

<script>
$j(document).ready(function() {
function trim11 (str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}
var selectedLang = "";

if('{{current_user.name}}' == 'Anonymous user'){
       selectedLang = $j('li.main.right.language_selector a.tab').text();
       $j('div#userNamewidget').html(selectedLang);
	   if(trim11(selectedLang) == 'English'){jQuery('#top-menu li.tab_forums a').html('Knowledge Center'); }
			else 
		if(trim11(selectedLang) == 'Français'){
                      jQuery('#top-menu li.tab_forums a').html('Base de Connaissance');
                      jQuery('h2#search_box').html('Base de Connaissance');
                     jQuery('h2.forums a:contains(Knowledge Center)').attr('href','/forums').text(' Base de Connaissance'); 
                  }
}


if('{{current_user.name}}' !== 'Anonymous user'){
       selectedLang = $j('li.main.right.language_selector a.tab').text();
       $j('div#userNamewidget').html(selectedLang);
	    if(trim11(selectedLang) == 'English'){ jQuery('#top-menu li.tab_forums a').html('Knowledge Center');}
				else 
		if(trim11(selectedLang) == 'Français'){
                     jQuery('#top-menu li.tab_forums a').html('Base de Connaissance');
                     jQuery('h2#search_box').html('Base de Connaissance');
                     jQuery('h2.forums').html('Base de Connaissance'); 
                     jQuery('h2.forums a:contains(Knowledge Center)').attr('href','/forums').text(' Base de Connaissance'); 
                  }
 }

});
</script>
