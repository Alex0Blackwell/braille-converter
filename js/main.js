// Braille logic

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z'];
var brailleAlphabet = [[1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 0, 0, 0, 0],
                       [1, 1, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0],
                       [1, 1, 1, 1, 0, 0], [1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0],
                       [0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0],
                       [1, 1, 0, 0, 1, 0], [1, 1, 0, 1, 1, 0], [1, 0, 0, 1, 1, 0],
                       [1, 1, 1, 0, 1, 0], [1, 1, 1, 1, 1, 0], [1, 0, 1, 1, 1, 0],
                       [0, 1, 1, 0, 1, 0], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1],
                       [1, 0, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1], [1, 1, 0, 0, 1, 1],
                       [1, 1, 0, 1, 1, 1], [1, 0, 0, 1, 1, 1]];


function getChar() {
  // 1 2
  // 3 4
  // 5 6
  var checkBoxes = [0, 0, 0, 0, 0, 0];

  for (var i = 1; i < 7; i++) {
    // Make the array for the inputted braille
    if(document.getElementById(i).checked) {
      checkBoxes[i-1] = 1;
    }
  }

  var strInput = checkBoxes.toString();
  var letter = '';

  var res = false;
  for (var x = 0; x < brailleAlphabet.length; x++) {
    if(strInput == brailleAlphabet[x].toString()) {
      res = true;
      break;
    }
  }

  if (alphabet[x] != undefined) {
    letter = `The braille letter is: "${alphabet[x]}"`;
  } else {
    var letter = "This letter does not exist in braille.";
  }
  document.getElementById("letterPlace").innerHTML = letter;

}


// Display once on load
ranNum = Math.floor(Math.random()*26);
ranLetter = alphabet[ranNum];
document.getElementById('placeTestLetter').innerHTML = `What is the letter: ${ranLetter} in binary?`;
var t0 = new Date().getTime()/1000;  // Make global

function testBraille() {
  // For filling in the testing braille
  var t1 = new Date().getTime()/1000;
  var checkBoxes = [0, 0, 0, 0, 0, 0];
  for (var i = 7; i < 13; i++) {
    // Make the array for the inputted braille
    // Note the id's are 7-12 this time
    if(document.getElementById(i).checked) {
      checkBoxes[i-7] = 1;
    }
  }
  // Get rid of existing images of wrong braille answers
  const myNode = document.getElementById("containSingleBraille");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  if(checkBoxes.toString() == brailleAlphabet[ranNum].toString()) {
    var totalT = (t1-t0).toFixed(2);
    if(totalT > 20) {
      document.getElementById('correctness').innerHTML = `That is the correct embossing of ${ranLetter}. That took more than 20 seconds.`;
    } else {
    document.getElementById('correctness').innerHTML = `That is the correct embossing of ${ranLetter}. That took ${totalT} seconds.`
    }
  } else {
    document.getElementById('correctness').innerHTML = `That is not the correct embossing of ${ranLetter}. The correct embossing is shown below:`
    //containSingleBraille
    show_image(`imgs/${ranLetter}.png`, "containSingleBraille");
  }
  // Get rid of the last braille input
  for (var i = 7; i < 13; i++) {
    document.getElementById(i).checked = false
  }
  // Get a random letter
  ranNum = Math.floor(Math.random()*26);
  ranLetter = alphabet[ranNum];
  document.getElementById('placeTestLetter').innerHTML = `What is the letter: ${ranLetter} in binary?`;
  // Get the intial time
  t0 = new Date().getTime()/1000;
}


function show_image(src, id, char) {
    // For appending braille images
    var img = document.createElement("img");
    img.src = src;
    img.width = 80;
    img.height = 110;
    img.alt = `Not a letter (${char})`

    document.getElementById(id).appendChild(img);
}


function translateToBraille() {
  var userInput = document.getElementById('textIn').value;
  // Remove all existing children nodes before showing anything new
  const myNode = document.getElementById("containBraille");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  // Append the images for characters
  for (var i = 0; i < userInput.length; i++) {
    if(userInput[i] == ' ') {
      var imageName = "imgs/space.png";
    } else {
      var imageName = "imgs/" + userInput[i] + ".png";
    }
    show_image(imageName, "containBraille", userInput[i])
  }
}



var boxes = document.querySelectorAll('#boxes > div');
  [].forEach.call(boxes, box => {
    box.addEventListener('mousemove', e => {
      document.body.style.setProperty(
        '--bg-color',
        box.style.getPropertyValue('--color')
      );

      var size = parseInt(getComputedStyle(box).width);

      // scaling
      var x = size * .3 * .7 + .7 * e.offsetX;
      var y = size * .3 * .7 + .7 * e.offsetY;

      box.style.setProperty('--x', x);
      box.style.setProperty('--y', y);
      box.style.setProperty('--size', size);
    });
  });


  // Get the input field
  var input = document.getElementById("textIn");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("transBraille").click();
    }
  });
