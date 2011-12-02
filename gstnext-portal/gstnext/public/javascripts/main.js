var loggedIn;

$(document).ready(function()
{
	//TODO: check if logged in
	initMenu();
});

function initMenu()
{
	if (loggedIn) {
		addMenuOption('Manage', '/');
		addMenuOption('Feedback', '/application/feedback');
		addMenuOption('Logout', '/application/loginRegister', true);
	} else {		
		addMenuOption('Manage', '/application/loginRegister');
		addMenuOption('Feedback', '/application/feedback');
		addMenuOption('Login/Register', '/application/loginRegister', true);
	}
}

function addMenuOption(label, url, last) {
	var html = '<div class="banner-button';
	
	if (last) {
		html += ' last';
	}
	
	html += '"><a href="' + url + '">' + label + '</a></div>';
	$('#banner-buttons').append(html);
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

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
	document.cookie=c_name + "=" + c_value;
}