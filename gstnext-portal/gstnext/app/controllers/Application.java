package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

	public static void index() {
		List<String> gameList = new ArrayList<String>();
		gameList.add("Street Fighter III: 3rd Strike");
		gameList.add("Grand Theft Auto IV");
		gameList.add("Red Dead Redemption");
		
		List<String> gameFeatures = new ArrayList<String>();
		gameFeatures.add("matchmaking");
		gameFeatures.add("voice");
		render(gameList, gameFeatures);
	}
    
	public static void loginRegister()
	{
		render();
	}
}