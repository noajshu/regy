console.log('hi');

var Shark=document.getElementById("SharkAudio");
var Meow=document.getElementById("MeowAudio");


var url = $.url();

var theLevel = 0;
var queryLevel = url.attr('query').split('&')[0].split('=')[1];
if(queryLevel != undefined){
	theLevel = parseInt(queryLevel);
}

console.log("current level = ");
console.log(theLevel);

var cmdBox = document.getElementById("userCommand");
var consoleDiv = document.getElementById("userConsole");
var userView = document.getElementById("userView");

var c = document.getElementById("userCanvas");
var ctx = c.getContext("2d");


function getRandomFactor() { //get random factor
	return Math.random()/2 + 0.75;
}

function getrV(avgSpeed){
	vel = avgSpeed * getRandomFactor();
	angle = getRandomFactor() * 3.14159 / 2;
	return({x:vel*Math.sin(angle), y:vel*Math.cos(angle)});
}

function getrP(){
	return({x:0, y:document.getElementById("userCanvas").height * getRandomFactor()/2});
}

var sharkAvgSpeed = 2;
var catAvgSpeed = 1.7;

function avgShark(theBody) {
	return {v:getrV(sharkAvgSpeed), pos:getrP(), type:"evil", body:theBody };
}

function avgCat(theBody) {
	return {v:getrV(catAvgSpeed), pos:getrP(), type:"good", body:theBody };
}




var level0 = {levelTargets:[avgShark("evil_shark")], levelInfo:"This is an evil shark"};
var level1 = {levelTargets:[avgCat("nice_cat")], levelInfo:"Type nothing--do not kill the cat"};
var level2 = {levelTargets:[avgCat("animal0"), avgShark("animal1")], levelInfo:"Type nothing--do not kill the cat"};



















var levelData =[level0, level1, level2];










var catImg = new Image();
catImg.src = "pixel_cat_1.png";
var aspectCat = 1.56;
var heightCat = c.height * 0.15;
var widthCat = heightCat * aspectCat;

var sharkImg = new Image();
sharkImg.src = "pixel_shark_1.png";
var aspectShark = 1.62;
var heightShark = c.height * 0.25;
var widthShark = heightShark * aspectShark;

var infoBox = document.getElementById("infoConsole");

var yMargin = 15;


// var targetArray = [{type:"evil", body:"shark", pos:{x:40, y:250}, v:{x:0.3, y:0.1}}, {type:"good", body:"meow5_21.tps", pos:{x:30, y:40}, v:{x:0.2, y:0.1}}];

var targetArray = levelData[theLevel].levelTargets;
console.log(targetArray);
infoBox.innerHTML = levelData[theLevel].levelInfo;

// function addTarget(theType, theBody, speedAcross){
// 	levelData[theLevel]

// 	var newTarget = {type:};
// }

// targetProperties = {evil:}

var FPS = 50;

function clearCanvas() {
	ctx.clearRect (0, 0, c.width, c.height);
}

function loopOnTargets(func) {
	var ret = [];
	for(var i=0; i<targetArray.length; i++) {
		ret.push(func(i, targetArray[i]));
	}
	return ret;
}

function drawTarget(target) {
	if(target.type == "evil"){
		ctx.drawImage(sharkImg, target.pos.x, target.pos.y, widthShark, heightShark);
	}
	else if(target.type == "good") {
		ctx.drawImage(catImg, target.pos.x, target.pos.y, widthCat, heightCat);
	}

	ctx.fillStyle = "#FFA319";
	ctx.font = "20px Arial";
	ctx.fillText(target.body, target.pos.x, target.pos.y);
}

var safeCats = 0;
var numCats = 0;
var deadSharks = 0;
var numSharks = 0;

for(var i=0; i<targetArray.length; i++) {
	if(targetArray[i].type=="good")numCats++;
	else numSharks++;
}

function reDraw() {
	clearCanvas();
	loopOnTargets(
		function(i, target){
			target.pos.x += target.v.x;
			target.pos.y += target.v.y;
			
			drawTarget(target);

			if(target.pos.y > c.height - yMargin || target.pos.y < yMargin){
				target.v.y = -target.v.y;
			}

			if(target.pos.x > c.width){
				// safe
				if(target.type=="evil"){
					Shark.play(); //ie, the shark made it across
					Lose();
				}
				else if(target.type =="good") {
					Meow.play();
					safeCats ++;
				}
			}
		}
	);
}


function loop() {
	reDraw();
	if(safeCats == numCats && deadSharks == numSharks) {
		Win();
	}
}



setInterval (loop, 1000/FPS);



function userEnter(cmd) {
	console.log("pressed enter");
	console.log("command = "+cmd);

	var userRegExp = new RegExp(cmd);
	consoleDiv.innerHTML = userRegExp;
	
	applyRegExp(userRegExp);
}

var SoundBoard = {"good":Meow, "evil":Shark};

function applyRegExp(userRegExp) {
	// kill matches
	for(var i=0; i<targetArray.length; i++) {
		console.log(userRegExp.exec(targetArray[i].body));
	}
	
	// go through targetArray for regex matches & destroy these strings
	// also do animation update of targetArray
	
	var tempTargets = [];
	
	var didKillAllSharks=true;
	var didKillNoCats=true;

	loopOnTargets(
		function(i, target){
			if(!target.body.match(userRegExp)){
				tempTargets.push(target);
				if(target.type == "evil")didKillAllSharks ==false;
			}
			else{
				
				if(target.type == "evil") {
					SoundBoard[target.type].play();
					deadSharks++;
				}
				else if(target.type == "good") {
					didKillNoCats = false;
					// also should play sad cat sound
				}
			}
		}
	);

	if(!didKillNoCats)Lose();


	targetArray = tempTargets;

}






cmdBox.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }

  var handled = false;

  if (event.keyCode !== undefined) {
    // Handle the event with KeyboardEvent.keyCode and set handled true.
    if(event.keyCode == 13) {
    	//user has pressed enter
		userEnter(cmdBox.value);
    	cmdBox.value = "";
	    handled = true;
    }
  }

  if (handled) {
    // Consume the event for suppressing "double action".
    event.preventDefault();
  }
}, true);

function Win() {
// should congratulate winner
	console.log("winner");
	window.setTimeout(function() {window.location = "?level="+(theLevel + 1).toString();}, 600);
}

function Lose() {
// should shame loser
	console.log("lost");
	window.setTimeout(function() {window.location = "?level="+(theLevel).toString();}, 600 );
}




