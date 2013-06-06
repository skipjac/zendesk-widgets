/*
 * jQuery v1.7.2 included
 */
//$ curl -u skip@zendesk.com:password -v -H"Content-type: application/binary" -H"Accept: application/json" -d@underscore-min.js -X POST https://z3nofskip.zendesk.com/api/v2/uploads?filename=underscore-min.js

//load local underscore libs 
$("head").append('<script type="text/javascript" src="/hc/theme_assets/41061/613/underscore-min.js"></script>');
$("head").append('<link  type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Open+Sans+Condensed:700" rel="stylesheet" />');
$("head").append('<script src="/hc/theme_assets/41061/613/config.js"></script>');
$("head").append('<script src="/hc/theme_assets/41061/613/skel.min.js"></script>');
$("head").append('<script src="/hc/theme_assets/41061/613/skel-ui.min.js"></script>');
$("head").append('<noscript><link  type="text/css" rel="stylesheet" href="/hc/theme_assets/41061/613/skel-noscript.css" /><link rel="stylesheet" href="/hc/theme_assets/41061/613/style2.css" /><link rel="stylesheet" type="text/css" href="/hc/theme_assets/41061/613/style-desktop.css" /></noscript>');
$("head").append('<link type="text/css" rel="stylesheet" href="/hc/theme_assets/41061/613/style2.css" />');
$('document').ready(function () {
  //move the submit a request to a sensable place
  $('<a class="button new-request" href="/hc/en-us/requests/new">Start a new conversation</a>').insertBefore('#requests-link');
  $('.side-info .button.new-request').remove();
	//Lets move that title into the header
	$('<div id="local-title"><h1 class="help-center-title">The z3n of Skip</h1></div>').insertAfter('#logo');
	$('.hero-unit .help-center-title').remove();
	// proof the DOM isn't loaded even though .ready has fired. 
	//console.log($('.nesty-input'));
	
  /*----------------------------------
  * conditional fields 
  * ----------------------------------
	*/
	// you have to map out the fields to get their id's for each option in the dropdown
	var field279466 = _.map($('[name="request[custom_fields][279466]"]'), function(i) {return i.id});
	var field20295661 = _.map($('[name="request[custom_fields][20295661]"]'), function(i) {return i.id});
	var field21613267 = _.map($('[name="request[custom_fields][21613267]"]'), function(i) {return i.id});
	var field280865 = _.map($('[name="request[custom_fields][280865]"]'), function(i) {return i.id});
	console.log(field279466);
	console.log(field20295661);
	console.log(field21613267);
	console.log(field280865);
	// make a hide all array for page load
	var hideAll = [].concat(field279466, field280865, field21613267);
	// hide passed fields 
	var hide = function() {
		$.each(arguments, function(i, item) {
			console.log('hide');
			_.each(item, function(i){$('#'+i).parents('.form-field').css('display', 'none')});
		});
	};
	// show passed fields
	var show = function() {
		$.each(arguments, function(i, item) {
			console.log('show');
			_.each(item, function(i){$('#'+i).parents('.form-field').css('display', '')});
		});
	};
	// the map of actions for each value selected.
	pickOne = {
		pass_tag: [].concat(field279466),
		other_helpdesk: [].concat(field280865)
	};
  pickTwo = {
    fire_to_new_page: (function(){document.location = "https://google.com";}()),
    xfer_to_a: [],
    asdf: []
  };
	
	// pass in the field that has changed and the mapping method you wish to use. 
	fieldFunc = function(changedField, mapper) {
    var badPierre = '';
		$.each(changedField, function(i,j) {
      var truth = $('#'+j).prop('checked');
      if (truth) { 
        badPierre =  $('#'+j).val();
        return badPierre;
      }
    });
		console.log(badPierre);
		if (_.isUndefined(mapper[badPierre])) {
				hide(_.difference(hideAll, [].concat(changedField)));
		} else {
			hide(_.difference(hideAll, [].concat(changedField, mapper[badPierre])));
			show(mapper[badPierre]);
		}
	};

	$('[name="request[custom_fields][20295661]"]').click(function() {
		fieldFunc(field20295661, pickOne);
	});
	
	$('[name="request[custom_fields][279466]"]').click(function() {
		fieldFunc(field279466, pickTwo);
	});
	
	hide(hideAll);
	fieldFunc(field20295661, pickOne);
  console.log('badPierre');
});
