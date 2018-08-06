/**
 * BCLearningNetwork.com
 * Volume Calculator  
 * @author Parsa Rajabi - ParsaRajabiPR@gmail.com
 * August 2018
 */

//// VARIABLES ////

var mute = false;
var FPS = 20;
var STAGE_WIDTH, STAGE_HEIGHT;
var gameStarted = false;

var width = 1;
var height = 1;
var length = 1;

var widthSlider, heightSlider, lengthSider;
var widthOutput, heightOutput, lengthOutput;

var sliderX, sliderY;


// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

/*
 * Initialize the stage and some createJS settings
 */
function init() {
    STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
    STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

    // init state object
    stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas
    stage.mouseEventsEnabled = true;
    stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

    setupManifest(); // preloadJS
    startPreload();

    stage.update();
}
/*
 * Main update loop.
 */

function update(event) {
    if (gameStarted) {}

    stage.update(event);
}

/*
 * Ends the game.
 */
function endGame() {
    gameStarted = false;
}



/*
 * Place graphics and add them to the stage.
 */
function initGraphics() {
    sliderX = 665;
    sliderY = 138;

    //    width output
    //new text(text, font, color)
    widthOutput = new createjs.Text(width, "21px Krungthep", "#1d55a9");
    widthOutput.x = sliderX - 35;
    widthOutput.y = sliderY + 6;
    stage.addChild(widthOutput);
    
    
      //    width output
    //new text(text, font, color)
    heightOutput = new createjs.Text(width, "20px Krungthep", "#1d55a9");
    heightOutput.x = sliderX - 35;
    heightOutput.y = sliderY + 80 + 6;
    stage.addChild(heightOutput);
    
    
      //    width output
    //new text(text, font, color)
    lengthOutput = new createjs.Text(width, "20px Krungthep", "#1d55a9");
    lengthOutput.x = sliderX - 35;
    lengthOutput.y = sliderY + 160 + 6;
    stage.addChild(lengthOutput);
    
    

    // new Slider(min, max, width, height)
    widthSlider = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY,
        value: 1 //default value
    });

    // new Slider(min, max, width, height)
    heightSlider = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 80,
        value: 1 //default value
    });

    // new Slider(min, max, width, height)
    lengthSider = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 160,
        value: 1 //default value
    });

    widthSlider.on("change", handleWidthSliderChange, this); // assign event handler to the slider (What function to call)

    heightSlider.on("change", handleHeightSliderChange, this); // assign event handler to the slider (What function to call)

    lengthSider.on("change", handleLengthSliderChange, this); // assign event handler to the slider (What function to call)

    stage.addChild(widthSlider, heightSlider, lengthSider);


    initMuteUnMuteButtons();
    initListeners();

    // start the game
    gameStarted = true;
    stage.update();
}

function handleWidthSliderChange(evt) {
    width = Math.round(evt.target.value);
    widthOutput.text = width;
//    console.log("Width: " + width);
}

function handleHeightSliderChange(evt) {
    height = Math.round(evt.target.value)
    heightOutput.text = height;
    console.log("Height: " + height);
}

function handleLengthSliderChange(evt) {
    length = Math.round(evt.target.value)
    lengthOutput.text = length;
    console.log("Length: " + length);
}
/*
 * Adds the mute and unmute buttons to the stage and defines listeners
 */
function initMuteUnMuteButtons() {
    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#000").drawRect(0, 0, muteButton.image.width, muteButton.image.height);
    muteButton.hitArea = unmuteButton.hitArea = hitArea;

    muteButton.x = unmuteButton.x = 5;
    muteButton.y = unmuteButton.y = 5;

    muteButton.cursor = "pointer";
    unmuteButton.cursor = "pointer";

    muteButton.on("click", toggleMute);
    unmuteButton.on("click", toggleMute);

    stage.addChild(unmuteButton);
}

/*
 * Add listeners to objects.
 */
function initListeners() {

}


//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;


/*
 * Add files to be loaded here.
 */
function setupManifest() {
    manifest = [
        {
            src: "images/Background.png",
            id: "background"
    }, {
            src: "images/mute.png",
            id: "mute"
    }, {
            src: "images/unmute.png",
            id: "unmute"
    }
 	];
}


function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

/*
 * Specify how to load each file.
 */
function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    // create bitmaps of images
    if (event.item.id == "background") {
        background = new createjs.Bitmap(event.result);
    } else if (event.item.id == "mute") {
        muteButton = new createjs.Bitmap(event.result);
    } else if (event.item.id == "unmute") {
        unmuteButton = new createjs.Bitmap(event.result);
    }
}

function loadError(evt) {
    console.log("Error!", evt.text);
}

// not currently used as load time is short
function handleFileProgress(event) {

}

/*
 * Displays the start screen.
 */
function loadComplete(event) {
    console.log("Finished Loading Assets");

    // ticker calls update function, set the FPS
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", update);
    // call update function
    stage.addChild(background);
    stage.update();
    initGraphics();
}

///////////////////////////////////// END PRELOADJS FUNCTIONS
