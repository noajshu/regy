console.log('hi');

var cmdBox = document.getElementById("userCommand");
var consoleDiv = document.getElementById("userConsole");
var userView = document.getElementById("userView");

function userEnter(cmd){
	console.log("pressed enter");
	console.log("command = "+cmd);

	var userRegExp = RegExp(cmd);

	consoleDiv.innerHTML += userRegExp;

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






