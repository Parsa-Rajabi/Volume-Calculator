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

var widthSlider_oneM, heightSlider_oneM, lengthSider_oneM;
var widthOutput_oneM, heightOutput_oneM, lengthOutput_oneM;


var widthSlider_tenM, heightSlider_tenM, lengthSider_tenM;
var widthOutput_tenM, heightOutput_tenM, lengthOutput_tenM;

var sliderX, sliderY;
var textX, textY;

var switchCheck = true;
//true if 1 M, false if 10 M

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
    if (gameStarted) {
        // if true, show 10 M stuff
        if (!switchCheck) {
            stage.addChild(widthSlider_tenM, heightSlider_tenM, lengthSider_tenM);
            widthOutput_tenM.visible = heightOutput_tenM.visible = lengthOutput_tenM.visible = true;

            stage.removeChild(widthSlider_oneM, heightSlider_oneM, lengthSider_oneM);
            widthOutput_oneM.visible = heightOutput_oneM.visible = lengthOutput_oneM.visible = false;
        } else if (switchCheck){
            stage.removeChild(widthSlider_tenM, heightSlider_tenM, lengthSider_tenM);
            widthOutput_tenM.visible = heightOutput_tenM.visible = lengthOutput_tenM.visible = false;

            stage.addChild(widthSlider_oneM, heightSlider_oneM, lengthSider_oneM);
            widthOutput_oneM.visible = heightOutput_oneM.visible = lengthOutput_oneM.visible = true;
        }

    }
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
    sliderX = 610;
    sliderY = 160;

    textX = 660;
    textY = 125;

    //////////////////////////////////////////ONE M START ///////////////////////////////

    //    width output
    //new text(text, font, color)
    widthOutput_oneM = new createjs.Text(width, "21px Krungthep", "#1d55a9");
    widthOutput_oneM.x = textX;
    widthOutput_oneM.y = textY;
    stage.addChild(widthOutput_oneM);


    //    width output
    //new text(text, font, color)
    heightOutput_oneM = new createjs.Text(height, "20px Krungthep", "#1d55a9");
    heightOutput_oneM.x = textX;
    heightOutput_oneM.y = textY + 80;
    stage.addChild(heightOutput_oneM);


    //    width output
    //new text(text, font, color)
    lengthOutput_oneM = new createjs.Text(length, "20px Krungthep", "#1d55a9");
    lengthOutput_oneM.x = textX;
    lengthOutput_oneM.y = textY + 160;
    stage.addChild(lengthOutput_oneM);


    // new Slider(min, max, width, height)
    widthSlider_oneM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY,
        value: 1 //default value
    });

    // new Slider(min, max, width, height)
    heightSlider_oneM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 80,
        value: 1 //default value
    });

    // new Slider(min, max, width, height)
    lengthSider_oneM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 160,
        value: 1 //default value
    });

    widthSlider_oneM.on("change", handleWidthSliderChange_oneM, this); // assign event handler to the slider (What function to call)

    heightSlider_oneM.on("change", handleHeightSliderChange_oneM, this); // assign event handler to the slider (What function to call)

    lengthSider_oneM.on("change", handleLengthSliderChange_oneM, this); // assign event handler to the slider (What function to call)

    stage.addChild(widthSlider_oneM, heightSlider_oneM, lengthSider_oneM);

    //////////////////////////////////////////TEN M START///////////////////////////////

    //    width output
    //new text(text, font, color)
    widthOutput_tenM = new createjs.Text(width*10, "21px Krungthep", "#1d55a9");
    widthOutput_tenM.x = textX;
    widthOutput_tenM.y = textY;
    stage.addChild(widthOutput_tenM);


    //    width output
    //new text(text, font, color)
    heightOutput_tenM = new createjs.Text(height*10, "20px Krungthep", "#1d55a9");
    heightOutput_tenM.x = textX;
    heightOutput_tenM.y = textY + 80;
    stage.addChild(heightOutput_tenM);


    //    width output
    //new text(text, font, color)
    lengthOutput_tenM = new createjs.Text(length*10, "20px Krungthep", "#1d55a9");
    lengthOutput_tenM.x = textX;
    lengthOutput_tenM.y = textY + 160;
    stage.addChild(lengthOutput_tenM);


    // new Slider(min, max, width, height)
    widthSlider_tenM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY,
        value: width //default value
    });

    // new Slider(min, max, width, height)
    heightSlider_tenM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 80,
        value: height //default value
    });

    // new Slider(min, max, width, height)
    lengthSider_tenM = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 160,
        value: length //default value
    });

    widthSlider_tenM.on("change", handleWidthSliderChange_tenM, this); // assign event handler to the slider (What function to call)

    heightSlider_tenM.on("change", handleHeightSliderChange_tenM, this); // assign event handler to the slider (What function to call)

    lengthSider_tenM.on("change", handleLengthSliderChange_tenM, this); // assign event handler to the slider (What function to call)

    //    stage.addChild(widthSlider_tenM, heightSlider_tenM, lengthSider_tenM);

    //    widthSlider_tenM.visible = heightSlider_tenM.visible = lengthSider_tenM.visible = false; 
    widthOutput_tenM.visible = heightOutput_tenM.visible = lengthOutput_tenM.visible = false;
    //////////////////////////////////////////TEN M OVER////////////////////////////////



    switchTenM.x = switchOneM.x = 590;
    switchTenM.y = switchOneM.y = 20;
    stage.addChild(switchTenM, switchOneM);
    switchTenM.visible = false;

    initMuteUnMuteButtons();
    initListeners();

    // start the game
    gameStarted = true;
    stage.update();
}

//////////////////////////////////////////ONE M//////////////////////////////////////////

function handleWidthSliderChange_oneM(evt) {
    width = Math.round(evt.target.value);
    widthOutput_oneM.text = width;
    console.log("Width: " + width);
}

function handleHeightSliderChange_oneM(evt) {

    height = Math.round(evt.target.value);
    heightOutput_oneM.text = height;
    console.log("Height: " + height);
}

function handleLengthSliderChange_oneM(evt) {
    length = Math.round(evt.target.value)
    lengthOutput_oneM.text = length;
    console.log("Length: " + length);
}



//////////////////////////////////////////TEN M//////////////////////////////////////////
function handleWidthSliderChange_tenM(evt) {
    width = Math.round(evt.target.value)*10;
    widthOutput_tenM.text = width;
    console.log("Ten Width: " + width);
}

function handleHeightSliderChange_tenM(evt) {

    height = Math.round(evt.target.value)*10;
    heightOutput_tenM.text = height;
    console.log("Ten Height: " + height);
}

function handleLengthSliderChange_tenM(evt) {
    length = Math.round(evt.target.value)*10;
    lengthOutput_tenM.text = length;
    console.log("Ten Length: " + length);
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

    //////////////ON SWITCH///////////////
    switchTenM.on("click", switchToOneM);
    switchOneM.on("click", switchToTenM);

}

function switchToOneM() {
    console.log("switch is to One M " + switchCheck);
    switchOneM.visible = true;
    switchTenM.visible = false
    switchCheck = true;
}

function switchToTenM() {
    console.log("switch is to Ten M " + switchCheck);
    switchTenM.visible = true;
    switchOneM.visible = false;
    switchCheck = false;
}

//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;
var switchTenM, switchOneM;


/*
 * Add files to be loaded here.
 */
function setupManifest() {
    manifest = [
        {
            src: "images/switchLeft.png",
            id: "LeftisM"
    }, {
            src: "images/switchRight.png",
            id: "RightisCM"
    }, {
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
    if (event.item.id == "RightisCM") {
        switchTenM = new createjs.Bitmap(event.result);
    } else if (event.item.id == "LeftisM") {
        switchOneM = new createjs.Bitmap(event.result);
    } else if (event.item.id == "background") {
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
