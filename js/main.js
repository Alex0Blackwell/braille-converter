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
    if(document.getElementById(i).getAttribute("data-checked") == "true") {
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
document.getElementById('placeTestLetter').innerHTML = `What is the letter: ${ranLetter} in braille?`;
var t0 = new Date().getTime()/1000;  // Make global
// Store 20 seconds as the fastest time if the variable doesnt exist
if (!localStorage.bestTime) {localStorage.bestTime = 20;}

function testBraille() {
  // For filling in the testing braille
  var t1 = new Date().getTime()/1000;
  var checkBoxes = [0, 0, 0, 0, 0, 0];
  for (var i = 7; i < 13; i++) {
    // Make the array for the inputted braille
    // Note the id's are 7-12 this time
    if(document.getElementById(i).getAttribute("data-checked") == "true") {
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
      document.getElementById('correctness').innerHTML = `That is the correct embossing of ${ranLetter}. That took more than 20 seconds. Best time: ${localStorage.bestTime}.`;
    }
    else if (totalT < parseFloat(localStorage.bestTime)) {
      localStorage.bestTime = totalT;
      document.getElementById('correctness').innerHTML = `That is the correct embossing of ${ranLetter}. New best time: ${totalT}!`;
    } else {
    document.getElementById('correctness').innerHTML = `That is the correct embossing of ${ranLetter}. That took ${totalT} seconds. Best time: ${localStorage.bestTime}.`
    }
  } else {
    document.getElementById('correctness').innerHTML = `That is not the correct embossing of ${ranLetter}. The correct embossing is shown below:`
    //containSingleBraille
    show_image(`imgs/${ranLetter.toLowerCase()}.png`, "containSingleBraille");
  }
  // Get rid of the last braille input
  let el;
  for (var i = 7; i < 13; i++) {
    el = document.getElementById(i);
    el.setAttribute('data-checked', false);
    el.style.backgroundColor = "white";
  }
  // Get a random letter
  ranNum = Math.floor(Math.random()*26);
  ranLetter = alphabet[ranNum];
  document.getElementById('placeTestLetter').innerHTML = `What is the letter: ${ranLetter} in braille?`;
  // Get the intial time
  t0 = new Date().getTime()/1000;
}


function show_image(src, id) {
    // For appending braille images
    var el = document.getElementById(id);
    var img = document.createElement("img");
    img.src = src;
    img.width = 80;
    img.height = 110;

    el.appendChild(img);
}


function translateToBraille() {
  var userInput = document.getElementById('textIn').value;
  // Remove all existing children nodes before showing anything new
  const myNode = document.getElementById("containBraille");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  // Append the images for characters
  let char, imageName;
  for (var i = 0; i < userInput.length; i++) {
    char = userInput[i].toLowerCase();
    // let's not allow double spaces
    if((char == ' ' && userInput[i-1] != ' ') || char.match(/[a-z]/i)) {
      imageName = (char == ' ' ? "imgs/space.png" : "imgs/" + char + ".png")
      show_image(imageName, "containBraille")
    }
  }
}


function toggleClick(el) {
  let state = el.getAttribute('data-checked')

  state == "false" ? state = "true" : state = "false"

  el.style.backgroundColor = (state == "true" ? "#2e2e2e" : "white");

  el.setAttribute('data-checked', state)
}


var input = document.getElementById("textIn");
input.addEventListener('input', translateToBraille);
translateToBraille()
