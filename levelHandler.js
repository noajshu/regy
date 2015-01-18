console.log('hi');

var url = $.url();

var queryLevel = url.attr('query').split('&')[0].split('=')[1];
// if(queryLevel != undefined){
// 	theLevel = parseInt(queryLevel);
// }

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
var level1 = {levelTargets:[avgCat("animal0"), avgShark("animal1")], levelInfo:"Type nothing--do not kill the cat"};



















var levelData =[level0, level1];



