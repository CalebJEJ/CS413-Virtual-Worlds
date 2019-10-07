var gameport = document.getElementById("gameV2");

var renderer = PIXI.autoDetectRenderer({width: 640,
                                        height: 320,
                                        backgroundColor: 0x000000});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//Load up the start screen
var startScreen = PIXI.Texture.from("resources/GameV2StartScreen.png");

var startSprite = new PIXI.Sprite(startScreen);

startSprite.anchor.x = 0.5;
startSprite.anchor.y = 0.5;

startSprite.position.x = 320;
startSprite.position.y = 160;

//set the screen to start the game on click
startSprite.interactive = true;
startSprite.on('mousedown', startGame);

stage.addChild(startSprite);

//begin animation
animate();

//set up variables for later sprites
var backgroundSprite;
var backgroundSprite2;
var howToPlayTextSprite;
var menuTextSprite;
var levelZeroSprite;


function startGame()
{
	//load music
	let backgroundSong = new PIXI.sound.Sound.from('resources/song01.mp3');
	//play music
	backgroundSong.loop = true;
	backgroundSong.play();
	
	//remove all children from the stage
	stage.removeChildren();
	//load in the "how to play" screen sprite sheet
	PIXI.Loader.shared.add('resources/waterAssets.json').load(setup);
	
	function setup() {
	    // create an array of textures from an image path
		var waterFrames = [];

		for (var i = 1; i < 6; i++) {

			waterFrames.push(PIXI.Texture.from('Water_Background0' + i + '.png'));
		}

		// create our animated sprite with the array
		backgroundSprite = new PIXI.AnimatedSprite(waterFrames);
		
		backgroundSprite.anchor.set(0.5);

		backgroundSprite.position.x = 160;
		backgroundSprite.position.y = 160;
		
		backgroundSprite.animationSpeed = 0.01;
		
		backgroundSprite.gotoAndPlay(0);

		//set the screens to go to the menu on click
		backgroundSprite.interactive = true;
		backgroundSprite.on('mousedown', loadMenu);
		
		stage.addChild(backgroundSprite);
		
		//second half of the how to screen background
		
		backgroundSprite2 = new PIXI.AnimatedSprite(waterFrames);
		
		backgroundSprite2.position.x = 480;
		backgroundSprite2.position.y = 160;
		
		backgroundSprite2.anchor.set(0.5);
		
		backgroundSprite2.animationSpeed = 0.01;
		
		backgroundSprite2.gotoAndPlay(0);
		
		stage.addChild(backgroundSprite2);
		
		
		//load in the text of how to play on top
		
		var howToPlayText = PIXI.Texture.from("resources/How_To_Play_Text.png");

		howToPlayTextSprite = new PIXI.Sprite(howToPlayText);

		howToPlayTextSprite.anchor.x = 0.5;
		howToPlayTextSprite.anchor.y = 0.5;
		
		howToPlayTextSprite.position.x = -320;
		howToPlayTextSprite.position.y = 160;
		
		createjs.Tween.get(howToPlayTextSprite.position).to({x: 320, y: 160}, 2000, createjs.Ease.bounceOut);

		
		//set the text to go to the menu on click as well just in case
		howToPlayTextSprite.interactive = true;
		howToPlayTextSprite.on('mousedown', loadMenu);
		
		stage.addChild(howToPlayTextSprite);
		
	}

	
}


function loadMenu()
{
	//remove all uneeded children from the stage
		//use a tween to have the text leave
	createjs.Tween.get(howToPlayTextSprite.position).to({x: 320, y: -320}, 2000, createjs.Ease.bounceOut);
	//turn off interactivity with background
	backgroundSprite.interactive = false;
	
	//load in the text for the menu
	var menuText = PIXI.Texture.from("resources/Menu_text.png");

	menuTextSprite = new PIXI.Sprite(menuText);

	menuTextSprite.anchor.x = 0.5;
	menuTextSprite.anchor.y = 0.5;

	menuTextSprite.position.x = 320;
	menuTextSprite.position.y = 480;
	
	createjs.Tween.get(menuTextSprite.position).to({x: 320, y: 160}, 3000, createjs.Ease.circOut);
	
	//once the menu is in postion get rid of the offscreen how to text
	if(menuTextSprite.position.y == 160)
	{
		stage.removeChild(howToPlayTextSprite);
	}

	stage.addChild(menuTextSprite);
	
	//load in the options menu sprite
	var options = PIXI.Texture.from("resources/Options_Sprite.png");

	optionsSprite = new PIXI.Sprite(options);

	optionsSprite.anchor.x = 1;
	optionsSprite.anchor.y = 0;

	optionsSprite.position.x = 640;
	optionsSprite.position.y = 480;
	
	createjs.Tween.get(optionsSprite.position).to({x: 640, y: 0}, 2500, createjs.Ease.circOut);

	//set the level icon to go to the level on click
	optionsSprite.interactive = true;
	optionsSprite.on('mousedown', loadOptions);

	stage.addChild(optionsSprite);
	
	
	//load in the sprites for the levels

    //Level Zero sprite
	var levelZero = PIXI.Texture.from("resources/Level0Menu.png");

	levelZeroSprite = new PIXI.Sprite(levelZero);

	levelZeroSprite.anchor.x = 0.5;
	levelZeroSprite.anchor.y = 0.5;

	levelZeroSprite.position.x = 160;
	levelZeroSprite.position.y = 480;
	
	createjs.Tween.get(levelZeroSprite.position).to({x: 160, y: 160}, 2000, createjs.Ease.circOut);

	//set the level icon to go to the level on click
	howToPlayTextSprite.interactive = true;
	howToPlayTextSprite.on('mousedown', loadLevel0);

	stage.addChild(levelZeroSprite);
	
	
	//Level One sprite
	var levelOne = PIXI.Texture.from("resources/Level01Menu.png");

	levelOneSprite = new PIXI.Sprite(levelOne);

	levelOneSprite.anchor.x = 0.5;
	levelOneSprite.anchor.y = 0.5;

	levelOneSprite.position.x = 320;
	levelOneSprite.position.y = 480;
	
	createjs.Tween.get(levelOneSprite.position).to({x: 160, y: 160}, 2500, createjs.Ease.circOut);

	//set the level icon to go to the level on click
	howToPlayTextSprite.interactive = true;
	howToPlayTextSprite.on('mousedown', loadLevel0);

	stage.addChild(levelOneSprite);
	
}

//loads the options menu on top of whatever is on screen
function loadOptions()
{
	//load in a box to hold the options
	
	var optionsMenuBack = PIXI.Texture.from("resources/Options_Menu_Back.png");

	optionsMenuBackSprite = new PIXI.Sprite(optionsMenuBack);

	optionsMenuBackSprite.anchor.x = 0.5;
	optionsMenuBackSprite.anchor.y = 0.5;

	optionsMenuBackSprite.position.x = 320;
	optionsMenuBackSprite.position.y = 480;
	
	createjs.Tween.get(optionsMenuBackSprite.position).to({x: 160, y: 500}, 2500, createjs.Ease.circOut);

	stage.addChild(optionsMenuBackSprite);
	
	//option 1 = restart the game
	
	//option 2 = turn music on or off
}

//this function loads up level 0
function loadLevel0()
{
	//remove all non background children from the stage
		//create a keboard listener for WASD keys for character movement
		//the listen will also listen for the O key which will open an options menu
			//Option menu conatian the following:
				//A button for turning music off
				//A reset the level button
				//A go back to menu button
			//levels have the following:
				//A background sprite
				//Several sprites for the puzzle blocks
					//One puzzle black is hidden the rest are jumbled
				//A completed version of the puzzle
			//Levels end when each of the jumbled puzzle's pieces postioning matches the complete ones
}

//this function loads up level 1
function loadLevel1()
{
	//remove all non background children from the stage
		//create a keboard listener for WASD keys for character movement
		//the listen will also listen for the O key which will open an options menu
			//Option menu conatian the following:
				//A button for turning music off
				//A reset the level button
				//A go back to menu button
			//levels have the following:
				//A background sprite
				//Several sprites for the puzzle blocks
					//One puzzle black is hidden the rest are jumbled
				//A completed version of the puzzle
			//Levels end when each of the jumbled puzzle's pieces postioning matches the complete ones
}

function animate()
{
	requestAnimationFrame(animate);
	renderer.render(stage);
}
