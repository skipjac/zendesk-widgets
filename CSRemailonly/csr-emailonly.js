if (!(window.location.href.indexOf('satisfaction') >= 0)) { 
$j('#top').show();
$j('#footer').show();
$j('#sidebar').show();
$j('#contentwrapper').css("padding","20px");
$j(".content_grey:contains('No such token')").html(

'<div class="grey_box_top"><div class="box box_top"></div></div> <p> No such token: The ticket may have been rated already or the token has expired </p> <p> </p> <div class="grey_box_bottom"><div class="box box_bottom"></div></div>'

);

}
