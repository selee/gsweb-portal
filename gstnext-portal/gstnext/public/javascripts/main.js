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