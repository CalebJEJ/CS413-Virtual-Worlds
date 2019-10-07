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

function startGame()
{
	//remove all children from the stage
	stage.removeChildren();
	//load in the "how to play" screen
	var howToScreenSprite;
	PIXI.Loader.shared.add('resources/waterAssets.json').load(setup);
	
	function setup() {
	    // create an array of textures from an image path
		var waterFrames = [];

		for (var i = 1; i < 6; i++) {

			waterFrames.push(PIXI.Texture.from('Water_Background0' + i + '.png'));
		}

		// create our animated sprite with the array
		howToScreenSprite = new PIXI.AnimatedSprite(waterFrames);
		
		howToScreenSprite.anchor.set(0.5);

		howToScreenSprite.position.x = 160;
		howToScreenSprite.position.y = 160;
		
		howToScreenSprite.animationSpeed = 0.01;
		
		howToScreenSprite.gotoAndPlay(0);

		//set the screen to start the game on click
		howToScreenSprite.interactive = true;
		howToScreenSprite.on('mousedown', loadMenu);
		
		stage.addChild(howToScreenSprite);
		animate();
	}
	
	//set the "how to play" screen to go to the level menu on click
	
}


function loadMenu()
{
	//remove all children from the stage
	//load in the menus background
	
	//load in the sprites for the levels
	
	//set the level sprites to load their corresponding level on click
}

//this function loads up a game level matching the ID code it was given
function loadLevel(levelID)
{
	//remove all children from the stage
	//check the ID code
		//load the level based on that ID code
		//create a keboard listener for WASD keys for character movement
		//the listen will also listen for the O key which will open an options menu
			//Option menu conatian the following:
				//A button for turning music off
				//A reset the level button
				//A go back to menu button
			//levels have the following:
				//A background sprite
				//Several sprites for the ice blocks
					//Ice blocks are removed once the character leaves its space
				//A main character sprite
					//can only onto spaces where an Ice Block is
			//Levels end when the alloted moves for the level are used up resulting in a winning screen
}

function animate()
{
	requestAnimationFrame(animate);
	renderer.render(stage);
}
