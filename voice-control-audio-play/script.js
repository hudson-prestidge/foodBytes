var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var grammar = '#JSGF V1.0; grammar commands; public <commands> = next | repeat'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a command.');
}

// function next() {
//     document.getElementById('next-sound').play();
// }

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at position 0.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var command = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + command + '.';
  document.getElementById('next-sound').play();
  console.log('result' + event.results[0]);
  }

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = 'I didnt recognise that color.';
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// function play() {
//     document.getElementById('next-sound').play();
// }

// function addListeners (element) {
//   element.addEventListener('click', playAudio)
// }

// function playAudio (evt) {
//  //
//   if (evt.target.speechRecognitionResult.contains('repeat')) {
//     var commandOne = document.getElementById('repeat-sound')
//     commandOne.volume = 0.5
//     commandOne.play()
//   } else {
//     // You can only mark cells that are hidden!
//     if (evt.target.speechRecognitionResult.contains('next')) {
//       // If the cell wasn't marked, play the mark sound and add a mark!
//       var markSound = document.getElementById('next-sound')
//       commandTwo.volume = 0.5
//       commandTwo.play()
//     }
//   }
