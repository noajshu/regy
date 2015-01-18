console.log('hi');

var cmdBox = document.getElementById("userCommand");
var consoleDiv = document.getElementById("userConsole");
var userView = document.getElementById("userView");

var c = document.getElementById("userCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FFA319";
ctx.font = "10px Arial";

var catImg = new Image();
catImg.src = "pixel_cat_1.png";
var aspectCat = 1.56;
var heightCat = c.height * 0.15;
var widthCat = heightCat * aspectCat;

var sharkImg = new Image();
sharkImg.src = "pixel_shark_1.png";
var aspectShark = 1;
var heightShark = c.height * 0.25;
var widthShark = heightShark * aspectShark;

var yMargin = 15;


// var targetArray = [{type:"evil", body:"shark", pos:{x:30, y:50}, v:{x:0.3, y:0.1}}, {type:"good", body:"meow5_21.tps", pos:{x:30, y:40}, v:{x:0.2, y:0.1}}];

var theLevel = 0;

function addTarget(theType, theBody, speedAcross){
	levelData[theLevel]

	var newTarget = {type:};
}

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
		ctx.drawImage(sharkImg, target.pos.x - widthShark/2, target.pos.y - heightShark/2, widthShark, heightShark);
	}
	else if(target.type == "good") {
		ctx.drawImage(catImg, target.pos.x - widthCat/2, target.pos.y - heightCat/2, widthCat, heightCat);
	}

	ctx.strokeText(target.body, target.pos.x, target.pos.y);
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
		}
	);
}

function loop() {
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
	
	// go through targetArray for regex matches & destroy these strings
	// also do animation update of targetArray
	
	var tempTargets = [];
	
	loopOnTargets(
		function(i, target){
			if(!target.body.match(userRegExp)){
				tempTargets.push(target);
			}
		}
	);

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






