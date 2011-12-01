var numGames = 0;
var featuresCollapsed = new Array();
var featuresList = new Array();
var numFeatures = 0;
var user;
//var couch = 'http://ec2-67-202-6-195.compute-1.amazonaws.com/couch/';
//var couch = '/couch';
var couch = '/node';
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

	if(validate(formData))
	{
		delete formData.passwordconfirm;
		formData = JSON.stringify(formData);
		
		$.ajax({
			type: 'POST',
			url: couch + '/person/',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: formData,
			success: function(data){
				//data.id is id of person
				alert(data.id);
			}
		});
	}
}
function submitLogin(formId)
{
	var formData = $(formId).serializeJSON();
	alert(JSON.stringify(formData));
}

function validate(formData)
{
	var error = false;
	$('#error').text('');
	if (formData.username == "")
	{
		$('#error').append('<div>User Name cannot be blank.</div>');
		error = true;
	}
	if(formData.password == "")
	{
		$('#error').append('<div>Password cannot be blank.</div>');
		error = true;
	}
	if (formData.password != formData.passwordconfirm)
	{
		$('#error').append('<div>Password Confirmation failed.</div>');
		error = true;
	}
	if(!validateEmail(formData.email))
	{
		$('#error').append('<div>Invalid email address.</div>');
		error = true;
	}
	return !error;
}

function validateEmail(email) { 
    var re = 
    	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}
