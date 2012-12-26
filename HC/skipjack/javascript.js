/*
 * jQuery v1.7.2 included
 */
//$ curl -u skip@zendesk.com:password -v -H"Content-type: application/binary" -H"Accept: application/json" -d@underscore-min.js -X POST https://z3nofskip.zendesk.com/api/v2/uploads?filename=underscore-min.js

//load local underscore libs 
$("head").append('<script type="text/javascript" src="/attachments/token/kmedaicrpexnkpf/"></script>');

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
	var field279466 = _.map($('input#[name="request[fields][279466]"]'), function(i) {return i.id});
	var field20295661 = _.map($('input#[name="request[fields][20295661]"]'), function(i) {return i.id});
	var field21613267 = _.map($('input#[name="request[fields][21613267]"]'), function(i) {return i.id});
	var field280865 = _.map($('input#[name="request[fields][280865]"]'), function(i) {return i.id});
	// make a hide all array for page load
	var hideAll = [].concat(field279466, field280865, field21613267);
	// hide passed fields 
var hide = function() {
	$.each(arguments, function(i, item) {
		_.each(item, function(i){$('#'+i).parents('.form-field').css('display', 'none')});
	});
}
	// show passed fields
	var show = function() {
		$.each(arguments, function(i, item) {
			_.each(item, function(i){$('#'+i).parents('.form-field').css('display', '')});
		});
	}
	// the map of actions for each value selected.
	pickOne = {
		pass_tag: [].concat(field279466),
		other_helpdesk: [].concat(field280865)
	}
	pickTwo = {
		xfer_to_a: [].concat(field21613267)
	}
	// pass in the field that has changed and the mapping method you wish to use. 
	fieldFunc = function(changedField, mapper) {
		$.each(changedField, function(i,j) {var truth = $('#'+j).prop('checked'); if (truth) {return badAlex = $('#'+j).val();} });
		console.log(badAlex);
		if (_.isUndefined(mapper[badAlex])) {
				hide(_.difference(hideAll, [].concat(changedField)));
		} else {
			hide(_.difference(hideAll, [].concat(changedField, mapper[badAlex])));
			show(mapper[badAlex]);
		}
	}

	$('input#[name="request[fields][20295661]"]').click(function() {
		fieldFunc(field20295661, pickOne);
	});
	
	$('input#[name="request[fields][279466]"]').click(function() {
		fieldFunc(field279466, pickTwo);
	});
	
	hide(hideAll);
	fieldFunc(field20295661, pickOne);
  console.log('bad alex');
});
