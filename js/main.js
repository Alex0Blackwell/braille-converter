function main() {
  // 1 2
  // 3 4
  // 5 6
  var checkBoxes = [0, 0, 0, 0, 0, 0];
  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var brailleAlphabet = [[1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 0, 0], [1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0], [0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0], [1, 1, 0, 0, 1, 0], [1, 1, 0, 1, 1, 0], [1, 0, 0, 1, 1, 0], [1, 1, 1, 0, 1, 0], [1, 1, 1, 1, 1, 0], [1, 0, 1, 1, 1, 0], [0, 1, 1, 0, 1, 0], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1], [1, 1, 0, 0, 1, 1], [1, 1, 0, 1, 1, 1], [1, 0, 0, 1, 1, 1]];

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
