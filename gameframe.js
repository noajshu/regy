console.log('hi');



function playerEnter(event){
	console.log("pressed enter");
}











var userReg = RegExp("ab*c");

var cmdBox = document.getElementById("userCommand")

cmdBox.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }

  var handled = false;
  if (event.key !== undefined) {
    // Handle the event with KeyboardEvent.key and set handled true.
  } else if (event.keyIdentifier !== undefined) {
    // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
  } else if (event.keyCode !== undefined) {
    console.log(event.keyCode);
    // Handle the event with KeyboardEvent.keyCode and set handled true.
  }

  if (handled) {
    // Consume the event for suppressing "double action".
    event.preventDefault();
  }
}, true);






