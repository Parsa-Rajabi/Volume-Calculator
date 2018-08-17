// use String;

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

var widthSlider, heightSlider, lengthSlider;
var widthOutput, heightOutput, lengthOutput;
var W, H, L, V;
var volume;

var sliderX, sliderY;
var textX, textY;
var equX, equY;
var volumeY;

var checkSwitch;
var sliderCheck = false;

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

        //    width output
        //new text(text, font, color)
        stage.removeChild(H);
        H = new createjs.Text(height, "18px Krungthep", "#1d55a9");
        H.x = equX + 75;
        H.y = equY;
        stage.addChild(H);


        //    width output
        //new text(text, font, color)
        stage.removeChild(L);
        L = new createjs.Text(length, "18px Krungthep", "#1d55a9");
        L.x = equX + 145;
        L.y = equY;
        stage.addChild(L);



        if (isChrome) {
            volumeY = 520;
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
        equY = 458;
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
    lengthOutput.y = textY + 165;
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

    heightSlider.on("pressmove", heightMoves, this);
    heightSlider.on("mousedown", heightChange, this);

    stage.addChild(widthSlider, heightSlider, lengthSlider);



    switchCM.x = switchM.x = 600;
    switchCM.y = switchM.y = 400;
    stage.addChild(switchCM, switchM);

    cube.x = 254;
    cube.y = 458;
    updateCube();

    switchCM.visible = false;
    initMuteUnMuteButtons();
    initListeners();

    // start the game
    gameStarted = true;
    stage.update();
}

function heightMoves(){
    console.log("Height change");
}

function heightChange(){
        console.log("Height mousedown");
}

function updateCube() {
    var originX = 254;
    var originY = 458;
    var new_height = height;
    var new_length = length;
    var new_width = width;
    
    for (var x = 0; x < height; x++) {
        for (var y = 0; y < length; y++) {
            for (var z = 0; z < width; z++) {
                var temp = Object.create(cube);
                temp.x = originX + y * cube.image.width / 2 - z * cube.image.width / 2;
                temp.y = originY - x * cube.image.height / 2 - 22 * y - 22 * z;
                if (sliderCheck) {
                    stage.addChildAt(temp, 2);
                } else if (!sliderCheck)
                    stage.addChildAt(temp, 3);
//                var temp1 = height;
//                height = new_height;
//                new_height = temp1;
//                console.log("height is " + height);
//                console.log("New Height is " + new_height);
            }
        }
    }
}


function handleWidthSliderChange(evt) {
    width = Math.round(evt.target.value);
    widthOutput.text = width;
    console.log("Width: " + width);
    sliderCheck = false;
    updateCube();
}

function handleHeightSliderChange(evt) {
    height = Math.round(evt.target.value)
    heightOutput.text = height;
    console.log("Height: " + height);
    sliderCheck = true;
    updateCube();
}

function handleLengthSliderChange(evt) {
    length = Math.round(evt.target.value)
    lengthOutput.text = length;
    console.log("Length: " + length);
    sliderCheck = false;
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
    switchCM.on("click", switchToOneM);
    switchM.on("click", switchToTenM);

}

function switchToOneM() {

    checkSwitch = false;
    console.log("switch is to one M");
    switchM.visible = true;
    switchCM.visible = false
}

function switchToTenM() {

    checkSwitch = true;
    console.log("switch is ten M");
    switchCM.visible = true;
    switchM.visible = false;
}

//////////////////////// PRELOADJS FUNCTIONS

// bitmap variables
var muteButton, unmuteButton;
var background;
var switchCM, switchM;
var cube;
var c2, c3, c4, c5;


/*
 * Add files to be loaded here.
 */
function setupManifest() {
    manifest = [
        {
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
    if (event.item.id == "cube") {
        cube = new createjs.Bitmap(event.result);
    } else if (event.item.id == "RightisCM") {
        switchCM = new createjs.Bitmap(event.result);
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
