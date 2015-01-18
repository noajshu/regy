console.log('hi');

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
	console.log('vel = '+vel.toString());
	angle = getRandomFactor() * 3.14159 / 2;
	console.log('angle = '+angle.toString());
	console.log({x:vel*Math.sin(angle), y:vel*Math.cos(angle)});
	return({x:vel*Math.sin(angle), y:vel*Math.cos(angle)});
}

function getrP(){
	return({x:0, y:document.getElementById("userCanvas").height * getRandomFactor()/2});
}

var sharkAvgSpeed = 2;
var catAvgSpeed = 1.7;

var level0 = {levelTargets:[{v:getrV(sharkAvgSpeed), pos:getrP(), type:"evil", body:"shark" }], levelInfo:"Type shark"};

var levelData =[level0]