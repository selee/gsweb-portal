var numGames = 0;
var featuresCollapsed = new Array();
var featuresList = new Array();
var numFeatures = 0;
var user;
var couch = 'http://ec2-67-202-6-195.compute-1.amazonaws.com/node/';
//var couch = '/couch';
//var couch = '/node';

function initLoginPage(page)
{
	
	if(loggedIn)
	{
		//alert('logged in');
		//changeState(STATE.GAMES);
	}
	$(page).load('/public/html/loginRegister.html', function(){
		
		$(page).slideDown();
	});
};

(function( $ ){
	$.fn.serializeJSON=function() {
		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){
			json[n['name']] = n['value'];
		});
		return json;
	};
})( jQuery );


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
				//fields: ok and id
				//alert(JSON.stringify(data));
				setCookie("id", data.id); 
				redirect(data);
			}
		});
	}
}

function redirect(data){
	if(data.active){
		setCookie("active", "true");
		changeState(STATE.GAMES);
	}
	else
	{
		changeState(STATE.TOS);
	}
}

function submitLogin(formId)
{
	
	var formData = $(formId).serializeJSON();
	formData = JSON.stringify(formData);
		$.ajax({
			type: 'POST',
			url: couch + '/authenticate/',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: formData,
			success: function(data){
				//fields: ok and id
				//alert(JSON.stringify(data));
				//alert(data.id);
				setCookie("id", data.id); 
				redirect(data);
			},

			error: function(data)
			{
				if(!data)
				{
					alert("The server is down.");
				}
				else if(data.error)
				{
					alert(data.error);
					
				}
				else
				{
					alert("Unexpected error occurred.");
				}
			}

		});
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

