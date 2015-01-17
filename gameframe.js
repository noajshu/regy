console.log('hi');

var cmdBox = document.getElementById("userCommand");
var consoleDiv = document.getElementById("userConsole");
var userView = document.getElementById("userView");


var c = document.getElementById("userCanvas");
var ctx = c.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0,0,150,75);
ctx.font = "30px Arial";
// ctx.fillText("Hello World",10,50);
ctx.strokeText("Hello World", 10, 50);

var targetArray = [{type:"evil", body:"meow3_12.tps"}, {type:"evil", body:"meow5_21.tps"}];


var FPS = 60;


function updateStrikes() {
	// go through targetArray for regex matches & destroy these strings
}

function reDraw() {
	for(var i=0; i<targetArray.length; i++) {
		ctx.strokeText(targetArray[i].body, 10, 50, 40);
	}
}

function loop() {
	updateStrikes();
	reDraw();
}

setInterval (loop, 1000/FPS);




function userEnter(cmd) {
	console.log("pressed enter");
	console.log("command = "+cmd);

	var userRegExp = new RegExp(cmd);
	consoleDiv.innerHTML = userRegExp;
	
	applyRegExp(userRegExp);
}


function applyRegExp(userRegExp) {
	// kill matches
	for(var i=0; i<targetArray.length; i++) {
		console.log(userRegExp.exec(targetArray[i].body));
	}
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






