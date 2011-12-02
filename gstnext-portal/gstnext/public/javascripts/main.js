var loggedIn;
var userId = getCookie("id");

	//TODO: check if logged in
	if(userId)
	{
		loggedIn = true;
	}
	if(getUrlVar('logout'))
	{
		loggedIn = false;
	}
$(document).ready(function()
{
	initMenu();

	$('#logout').click(function()
	{
		deleteCookie('id');
		deleteCookie('session');
	});
});

function initMenu()
{
		addMenuOption('Manage', 'manage', '/');
		addMenuOption('Feedback', 'feedback', '/application/feedback');
	if (loggedIn) {
		addMenuOption('Logout', 'logout', '/application/loginRegister', true);
	} else {		
		addMenuOption('Login/Register', 'login', '/application/loginRegister', true);
	}
}

function addMenuOption(label, id, url, last) {
	var html = '<div class="banner-button';
	
	if (last) {
		html += ' last';
	}
	
	html += '"><a id="' + id + '" href="' + url + '">' + label + '</a></div>';
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

function deleteCookie(name)
{
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}


	function getUrlVars(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	function getUrlVar(name){
		return getUrlVars()[name];
	}
