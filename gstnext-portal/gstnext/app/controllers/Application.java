package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

	public static void index() {
		List<String> gameList = new ArrayList<String>();

		List<String> gameFeatures = new ArrayList<String>();
		gameFeatures.add("EasyMatch");
		render(gameList, gameFeatures);
	}
    
	public static void loginRegister()
	{
		render();
	}
	
	public static void gameRow(String gameName, String gameId)
	{
		List<String> gameFeatures = new ArrayList<String>();
		gameFeatures.add("EasyMatch");
		
		render(gameName, gameId, gameFeatures);
	}
	
	public static void tos()
	{
		render();
	}
}
