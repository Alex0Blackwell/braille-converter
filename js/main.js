// Brialle logic

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z'];


function getChar() {
  // 1 2
  // 3 4
  // 5 6
  var checkBoxes = [0, 0, 0, 0, 0, 0];
  var brailleAlphabet = [[1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 0, 0, 0, 0],
                         [1, 1, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0],
                         [1, 1, 1, 1, 0, 0], [1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0],
                         [0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0],
                         [1, 1, 0, 0, 1, 0], [1, 1, 0, 1, 1, 0], [1, 0, 0, 1, 1, 0],
                         [1, 1, 1, 0, 1, 0], [1, 1, 1, 1, 1, 0], [1, 0, 1, 1, 1, 0],
                         [0, 1, 1, 0, 1, 0], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1],
                         [1, 0, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1], [1, 1, 0, 0, 1, 1],
                         [1, 1, 0, 1, 1, 1], [1, 0, 0, 1, 1, 1]];

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
    letter = `The brialle letter is: "${alphabet[x]}"`;
  } else {
    var letter = "This letter does not exist in braille.";
  }
  document.getElementById("letterPlace").innerHTML = letter;

}


function show_image(src, char) {
    // For appending braille images
    var img = document.createElement("img");
    img.src = src;
    img.width = 80;
    img.height = 110;
    img.alt = `Not a letter (${char})`

    document.getElementById('containBraille').appendChild(img);
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
    show_image(imageName, userInput[i])
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
