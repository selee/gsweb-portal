STATE =
{
	LOGIN : "login",
	TOS: "tos",
	GAME: "game"
};

var page = '#page-content';

var state;
	
function changeState(newState)
{
	state = newState;
	$(page).empty();
	stateHandler();
}

function stateHandler()
{
	if(state == STATE.LOGIN){
		//do login page stuff
		initLoginPage(page);
	}
	else if(state == STATE.TOS){
		//do terms of service page stuff
		initTosPage(page);
	} 
	else if(state == STATE.GAME){
		//do game page stuff
		initGamePage(page);
	}
}

var loggedIn;
var userId = getCookie("id");

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
	
	//temp: init login/register page
	changeState(STATE.LOGIN);
});

function initMenu()
{
	addMenuOption('Manage', 'manage', '/');
	//TODO: Official thread for FieldKit?
	addMenuOption('Forum', 'forum', 'http://forum.unity3d.com/forums/32-Assets-and-Asset-Store?s=253e24de7a7e4f6b4353dcde7a7f2fa7');

	addMenuOption('Contact Us', 'contact-us', emailUs());	

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
function emailUs()
{

	var fk = 'fieldkit';
	var gs = 'gamespy';
	var com = '.com';

	var mailTo = 'mailto:' + fk + '@' + gs + com;

	return mailTo;

}
