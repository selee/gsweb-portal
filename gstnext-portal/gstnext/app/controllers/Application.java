package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

	public static void index() {
		List<String> gameList = new ArrayList<String>();

		render(gameList);
	}
    
	public static void loginRegister()
	{
		render();
	}
	
	public static void gameRow(String gameName, String gameId)
	{
		List<String> gameFeatures = new ArrayList<String>();
		gameFeatures.add("matchmaking");
		gameFeatures.add("voice"); 
		
		render(gameName, gameId, gameFeatures);
	}
	
	public static void tos()
	{
		render();
	}
}