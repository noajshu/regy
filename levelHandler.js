console.log('hi');

var cmdBox = document.getElementById("userCommand");
var consoleDiv = document.getElementById("userConsole");
var userView = document.getElementById("userView");

var c = document.getElementById("userCanvas");
var ctx = c.getContext("2d");


function getRandomFactor() { //get random factor
	return Math.random() + 0.5;
}

function getrV(avgSpeed){
	vel = avgSpeed * getRandomFactor();
	angle = getRandomFactor() * 90;
	return({x:Math.sin(vel), y:Math.cos(vel)});
}

function getrP(){
	return({x:0, y:document.getElementById("userCanvas").height * getRandomFactor()/2});
}

var sharkAvgSpeed = 20;
var catAvgSpeed = 17;

var level0 = [{v:getrV(sharkAvgSpeed), pos:getrP(), type:"evil", body:"shark" }];

var levelData =[level0]