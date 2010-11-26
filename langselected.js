<div id="userNamewidget">
</div>
<script>
$j(document).ready(function() {
//this is needed because the language string is surrounded by white space.  
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
 if('{{current_user.name}}' === 'Anonymous user'){
       selectedLang = $j('li.main.right.language_selector a.tab').text();
       $j('div#userNamewidget').html(selectedLang);
       }

       if(trim11(selectedLang) === 'English'){ $j('div#userNamewidget').html('This is English');}
       else if(trim11(selectedLang) === 'Deutsch'){ $j('div#userNamewidget').html('This is German');}
});
</script>
