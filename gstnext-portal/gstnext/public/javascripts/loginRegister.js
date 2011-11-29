var numGames = 0;
var featuresCollapsed = new Array();
var featuresList = new Array();
var numFeatures = 0;
var user;
var couch = 'http://ec2-67-202-6-195.compute-1.amazonaws.com/couch/';
//var couch = '/couch';
(function( $ ){
	$.fn.serializeJSON=function() {
		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){
			json[n['name']] = n['value'];
		});
		return json;
	};
})( jQuery );

$(document).ready(function()
{
	
});


function submitForm(formId)
{
	var formData = $(formId).serializeJSON();
	alert(JSON.stringify(formData));	
}