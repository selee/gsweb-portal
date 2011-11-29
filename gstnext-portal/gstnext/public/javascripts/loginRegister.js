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


function submitRegister(formId)
{
	var formData = $(formId).serializeJSON();
	validate(formData);
	alert(JSON.stringify(formData));
}
function submitLogin(formId)
{
	var formData = $(formId).serializeJSON();
	alert(JSON.stringify(formData));
}

function validate(formData)
{
	$('#error').text('');
	if (formData.owner == "")
	{
		$('#error').append('<div>User Name cannot be blank.</div>');
	}
	if(formData.password == "")
	{
		$('#error').append('<div>Password cannot be blank.</div>');
	}
	if (formData.password != formData.passwordconfirm)
	{
		$('#error').append('<div>Password Confirmation failed.</div>');
	}
	if(!validateEmail(formData.email))
	{
		$('#error').append('<div>Invalid email address.</div>');
	}
}

function validateEmail(email) { 
    var re = 
    	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 