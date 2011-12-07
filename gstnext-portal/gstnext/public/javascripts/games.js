var numGames = 0;
var featuresCollapsed = new Array();
var featuresList = new Array();
var numFeatures = 0;
var user;
//var couch = 'http://ec2-67-202-6-195.compute-1.amazonaws.com/couch/';
//var couch = '/couch';
var couch = '/node';
		


function initGamesPage()
{
	if(!loggedIn)
	{
		changeState(STATE.LOGIN);
	}
	
	$(page).load('/public/html/games.html', function(){
		$(page).slideDown();
	});
	
	getUser();
	initNewGame();
};

function getUser()
{

	$.getJSON(couch + '/person/' + userId, 
	function(data)
	{
		user = data;
		//$('#welcome').text("Welcome, " + user.username);
		
		if(!user.applications)
		{
			return;
		}

		if(!user.active)
		{
			alert('not active!');
		}

		for(var i = 0; i < user.applications.length; i++)
		{
			$.getJSON(couch + '/application/' + user.applications[i], 
			function(app)
			{
				addRow(encodeURI(app.name), app._id, app._rev);
			});
		}
	});
	
}

function addRow(name, id, rev)
{
	
	
	$('#games-list').append('<div id="game-' + id + '"></div>');
	$('#game-' + id).load(createRow({gameId: id, gameName: name }),
		function()
		{
			initArrow(id);
			initFeatures(id);
			initDelete(id, rev);
		});	
}

function initDelete(n, rev)
{
	$('#delete-' + n).click(function()
	{
		$.ajax({
			type: 'DELETE',
			url: couch + '/application/' + n + '?rev=' + rev,
			success: function(data){
				$('#game-' + n).remove();
				user.applications.splice(user.applications.indexOf(n), 1);
				$.ajax({
					type: 'POST',
					url: couch + '/person/',
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(user),
					success: function(data){
					}
				});
			}
		});
	});
}

function setNumGames(n)
{
	numGames = n;
}

function addFeature(name)
{
	featuresList[numFeatures] = name;
	numFeatures++;
}

function initFeatures(n)
{
	for(var i = 0; i < numFeatures; i++)
	{
		var append = n + '-' + featuresList[0];
		$('#key-' + append).text(createKey(n,featuresList[0]));
		(function(x){
			
			var append = n + '-' + featuresList[x];
			$('#button-' + append).click(function()
			{
				if($('#button-text-' + append).text() == 'activate')
				{
					$('#key-' + append).text(createKey(n,x));
					$('#button-text-' + append).text('deactivate');
					$('#key-' + append).removeClass('greyed-out');
				} else
				{
					$('#button-text-' + append).text('activate');
					$('#key-' + append).addClass('greyed-out');
				}
			});	
		})(i);
	}
}

function createKey(game, feature)
{
	return game;
}

function initArrow(n)
{
	$('#feature-arrow-' + n).click(function()
	{
		if(featuresCollapsed[n])
		{
			//uncollapse feature list for game
			featuresCollapsed[n] = false;
			$('#features-' + n).slideDown();
			$('#feature-arrow-' + n).attr('src', '/public/images/arrow_down_16.png');
		} 
		else 
		{
			//else collapse feature list
			featuresCollapsed[n] = true;
			$('#features-' + n).slideUp();
			$('#feature-arrow-' + n).attr('src', '/public/images/arrow_right_16.png');
		}
	});
	featuresCollapsed[n] = true;
}

function initNewGame()
{
	$('#new-game-button').click(function()
	{
		var gameName = $('#new-game-name').val();
		if(gameName)
		{
			var newGame = {name: gameName};
			$.ajax({
				type: 'POST',
				url: couch + '/application/',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(newGame),
				success: function(data){
					addRow(encodeURI(gameName), data.id);
					/*
					if(!user.applications)
					{
						user.applications = new Array();
					}
	
					user.applications[user.applications.length] = data.id;
					$.ajax({
						type: 'POST',
						url: couch + '/person/',
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						data: JSON.stringify(user),
						success: function(data){
							//do stuff
						}
					});
					*/
				}
			});
			
		}
	});
}
