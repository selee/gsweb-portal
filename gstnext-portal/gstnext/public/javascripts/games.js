var numGames = 0;
var featuresCollapsed = new Array();
var featuresList = new Array();
var numFeatures = 0;

$(document).ready(function()
{
	for(var i = 1; i <= numGames; i++)
	{
		initArrow(i);
		initFeatures(i);
	}
	initNewGame();
});

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
	return 'some key';
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
		} 
		else 
		{
			//else collapse feature list
			featuresCollapsed[n] = true;
			$('#features-' + n).slideUp();
		}
		
	});
	featuresCollapsed[n] = true;
}

function initNewGame()
{
	$('#new-game-button').click(function()
	{
		var gameName = $('#new-game-name').text();
		if(gameName)
		{
			
		}
	});
}

//#new-game-name
//#new-game-button

