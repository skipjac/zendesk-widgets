<div id="custom-twitter-widget"></div>
<script> 
  Widget.require("http://widgets.twimg.com/j/2/widget.js");

document.observe('widgets:load', function() {
  new TWTR.Widget({ 
    id: "custom-twitter-widget",
    version: 2, 
    type: 'list', 
    rpp: 30, 
    interval: 6000, 
    title: 'Everything we do at', 
    subject: 'the twoffice', 
    width: 250, 
    height: 300, 
    theme: { 
      shell: { 
	background: '#ff96e7', 
	color: '#ffffff' 
      }, 
      tweets: { 
	background: '#ffffff', 
	color: '#444444', 
	links: '#b740c2' 
      } 
    }, 
    features: { 
      scrollbar: true, 
      loop: false, 
      live: true, 
      hashtags: true, 
      timestamp: true, 
      avatars: true, 
      behavior: 'all' 
    } 
  }).render().setList('twitter', 'more-twitter-accounts').start(); 
});
</script>                       
