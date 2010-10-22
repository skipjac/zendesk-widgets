//this is a custom widget for the sidebar of zendesk to display the RSS feed
//of a fourm just copy and paste this code into a custom widget. The one 
//bug I couldn't fix is if the 1st 200 charater contain something in the pre tags
//it doesn't wrap and over runs the sidebar.

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
	 

	//Place your own URL here 
	$j.get('/forums/66730-tips-tricks/posts.rss', function(d) {

		
		$j(d).find('item').each(function(index) {

			//name the current found item this for this particular loop run
			var $item = $j(this);
			// grab the post title
			var title = $item.find('title').text();

			// grab the post's URL
			var link = $item.find('link').text();
			// next, the description the second value sets the number of characters to display the 3rd value is what you want the ellipse to be 
                        var description = truncate($item.find('description').text(), 200, '...');
			//don't forget the pubdate
			var pubDate = $item.find('pubDate').text();

			// now create a var 'html' to store the markup we're using to output the feed to the browser window
			var html = "<div class=\"rssentry\"><h2 class=\"rsspostTitle\">" + title + "<\/h2>";
			html += "<em class=\"rssdate\">" + pubDate + "</em>";
			html += "<p class=\"rssdescription\">" + description + "</p>";
			html += "<a href=\"" + link + "\" target=\"_blank\">Read More >><\/a><\/div>";

			//put that feed content on the screen!
			$j('#feedContent').append(html);

                        // Set the number of items you want displayed remember the count starts at zero so this will display 3 topics 
                        if(index > 1) {return false;}  

		});
	});


});

</script>
