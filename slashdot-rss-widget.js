<div id="feedContent">
	
</div>
<script type="javascript">
	 
$j(document).ready(function() {


truncate = function(text, length, ellipsis) {    

    // Set length and ellipsis to defaults if not defined
    if (typeof length == 'undefined') var length = 100;
    if (typeof ellipsis == 'undefined') var ellipsis = '...';

    // Return if the text is already lower than the cutoff
    if (text.length < length) return text;

    // Otherwise, check if the last character is a space.
    // If not, keep counting down from the last character
    // until we find a character that is a space
    for (var i = length-1; text.charAt(i) != ' '; i--) {
        length--;
    }

    // The for() loop ends when it finds a space, and the length var
    // has been updated so it doesn't cut in the middle of a word.
    return text.substr(0, length) + ellipsis;
}
	 

	
	$j.get('/proxy/direct?url=http://rss.slashdot.org/Slashdot/slashdot', function(d) {

		
		$j(d).find('item').each(function(index) {

			//name the current found item this for this particular loop run
			var $item = $j(this);
//console.log($item);
			// grab the post title
			var title = $item.find('title').text();

			// grab the post's URL
			var link = $item.find('link').text();
			// next, the description the second value sets the number of characters to display the 3rd value is what you want the ellipse to be 
                       var foo = $j.trim($item.find('description').text().replace(/(<.*?>)/ig,""));
                        var description = truncate(foo, 100, '...');
//console.log($j.trim($j(foo).text().replace(/(<.*?>)/ig,"")));
			//don't forget the pubdate
			var pubDate = $item.find('date').text();

			// now create a var 'html' to store the markup we're using to output the feed to the browser window
			var html = "<div class=\"rssentry\"><h2 class=\"rsspostTitle\">" + title + "<\/h2>";
			html += "<em class=\"rssdate\">" + pubDate + "</em>";
			html += "<p class=\"rssdescription\">" + description + "</p>";
			html += "<a href=\"" + link + "\" target=\"_blank\">Read More >><\/a><\/div>";

			//put that feed content on the screen!
			$j('#feedContent').append(html);

                        // Set the number of items you want displayed remember the count starts at zero
                        if(index > 1) {return false;}  

		});
	});


});

</script>

