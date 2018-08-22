/**
 * BCLearningNetwork.com
 * Volume Calculator  
 * @author Parsa Rajabi - ParsaRajabiPR@gmail.com
 * co-autors Brittany Miller and Colin Bernard
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

var widthSlider, heightSlider, lengthSlider;
var widthOutput, heightOutput, lengthOutput;
var W, H, L, V;
var volume;

var sliderX, sliderY;
var textX, textY;
var equX, equY;
var volumeY;

var checkSwitch = false;
var cubes = [];
var cubeIndex = 0;

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

        //    width output
        //new text(text, font, color)
        stage.removeChild(W);
        W = new createjs.Text(width, "19px Krungthep", "#1d55a9");
        W.x = equX;
        W.y = equY;
        stage.addChild(W);

        //    Height output
        //new text(text, font, color)
        stage.removeChild(H);
        H = new createjs.Text(height, "18px Krungthep", "#1d55a9");
        H.x = equX + 75;
        H.y = equY;
        stage.addChild(H);


        //    Length output
        //new text(text, font, color)
        stage.removeChild(L);
        L = new createjs.Text(length, "18px Krungthep", "#1d55a9");
        L.x = equX + 145;
        L.y = equY;
        stage.addChild(L);

        //changes the Y postion of text boxes if the application is chrome
        if (isChrome) {
            volumeY = 551;
            equY = 525;
        } else
            volumeY = 555;

        volume = width * height * length;
        //    width output
        //new text(text, font, color)
        stage.removeChild(V);
        V = new createjs.Text(volume, "19px Krungthep", "#1d55a9");
        V.x = 550;
        V.y = volumeY;
        stage.addChild(V);

        //the checkSwitch boolean checks if the switch has been toggled or not and if so, the value of W, H, L and V are changed 
        if (checkSwitch) {
            W.text = width * 10;
            H.text = height * 10;
            L.text = length * 10;
            V.text = volume * 1000;
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
    sliderX = 630;
    sliderY = 120;

    if (isChrome) {
        textY = 80;
    }
    textX = 675;
    textY = 83;

    equX = 560;
    equY = 530;

    //    width output
    //new text(text, font, color)
    widthOutput = new createjs.Text(width, "21px Krungthep", "#1d55a9");
    widthOutput.x = textX;
    widthOutput.y = textY;
    stage.addChild(widthOutput);

    //    width output
    //new text(text, font, color)
    heightOutput = new createjs.Text(height, "20px Krungthep", "#1d55a9");
    heightOutput.x = textX;
    heightOutput.y = textY + 80;
    stage.addChild(heightOutput);

    //    width output
    //new text(text, font, color)
    lengthOutput = new createjs.Text(length, "20px Krungthep", "#1d55a9");
    lengthOutput.x = textX;
    lengthOutput.y = textY + 164;
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
    lengthSlider = new Slider(1, 5, 100, 30).set({
        x: sliderX,
        y: sliderY + 160,
        value: 1 //default value
    });

    widthSlider.on("change", handleWidthSliderChange, this); // assign event handler to the slider (What function to call)

    heightSlider.on("change", handleHeightSliderChange, this); // assign event handler to the slider (What function to call)

    lengthSlider.on("change", handleLengthSliderChange, this); // assign event handler to the slider (What function to call)

    stage.addChild(widthSlider, heightSlider, lengthSlider);

    switch10m.x = switchM.x = 600;
    switch10m.y = switchM.y = 410;
    stage.addChild(switch10m, switchM);

    updateCube();

    switch10m.visible = false;
    initMuteUnMuteButtons();
    initListeners();

    // start the game
    gameStarted = true;
    stage.update();
}

//updates the cube and adds the length, width and height depending on the value of respective variables (through sliders)
function updateCube() {
    resetCubes();
    var originX = 254;
    var originY = 450;
    var new_height = height;
    var new_length = length;
    var new_width = width;
    
    for (var x = 0; x < height; x++) {
        for (var y = length-1; y >= 0; y--) {
            for (var z = width-1; z >= 0; z--) {
                cubes[cubeIndex] = Object.create(cube);
                cubes[cubeIndex].x = originX + y * cube.image.width / 2 - z * cube.image.width / 2;
                cubes[cubeIndex].y = originY - x * cube.image.height / 2 - 22 * y - 22 * z;
                stage.addChild(cubes[cubeIndex]);
                cubeIndex++;
            }
        }
    }
}

//removes all the cubes from the stage and resets for the next updateCube
function resetCubes(){
    for (var i = 0; i < cubes.length;i++){
        stage.removeChild(cubes[i]);
    }
    cubes = [];
    cubeIndex = 0;
}


function handleWidthSliderChange(evt) {
    width = Math.round(evt.target.value);
    widthOutput.text = width;
//    console.log("Width: " + width);
    updateCube();
}

function handleHeightSliderChange(evt) {
    height = Math.round(evt.target.value)
    heightOutput.text = height;
//    console.log("Height: " + height);
    updateCube();
}

function handleLengthSliderChange(evt) {
    length = Math.round(evt.target.value)
    lengthOutput.text = length;
//    console.log("Length: " + length);
    updateCube();
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
    switch10m.on("click", switchToOneM);
    switchM.on("click", switchToTenM);

}

function switchToOneM() {
    playSound("toggle");
    checkSwitch = false;
//    console.log("switch is to one M");
    switchM.visible = true;
    switch10m.visible = false
}

function switchToTenM() {
    playSound("toggle");
    checkSwitch = true;
//    console.log("switch is ten M");
    switch10m.visible = true;
    switchM.visible = false;
}

//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;
var switch10m, switchM;
var cube;
var toggle;

/*
 * Add files to be loaded here.
 */
function setupManifest() {
    manifest = [
        {
            src: "sounds/click2.mp3",
            id: "toggle"
    },{
            src: "images/cube.png",
            id: "cube"
    }, {
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
     if (event.item.id == "toggle") {
        toggle = new createjs.Bitmap(event.result);
    } else if (event.item.id == "cube") {
        cube = new createjs.Bitmap(event.result);
    } else if (event.item.id == "RightisCM") {
        switch10m = new createjs.Bitmap(event.result);
    } else if (event.item.id == "LeftisM") {
        switchM = new createjs.Bitmap(event.result);
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
