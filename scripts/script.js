//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================


const story = {
  'beach': {
    after: ['and', 'they', 'forgot', 'their'],
    children: {
      'cat': {
        '.': '.'
      },
      'cheetos': {
        '.': '.'
      },
      'towels': {
        '.': '.'
      }
    }
  },
  'mall': {
    after: ['and', 'they', 'bought', 'new'],
    children: {
      'slippers': {
        '.': '.'
      },
      'toothpaste': {
        '.': '.'
      },
      'Facebook Portals': {
        '.': '.'
      }
    }
  },
  'castle': {
    after: ['and', 'fell', 'into', 'the'],
    children: {
      'well': {
        '.': '.'
      },
      'toilet': {
        '.': '.'
      },
      'moat': {
        '.': '.'
      }
    }
  }
}



// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const TouchGestures = require('TouchGestures');

const face = FaceTracking.face(0);
const storyText = Scene.root.find('2dTextStory');
storyText.text = 'Tap to play game';

// const optionText = Scene.root.find('2dTextOption');
// optionText.text = '';

// FaceTracking.face(0).mouth.openness.monitor({ fireOnInitialValue: true }).subscribe(event => {
//   Diagnostics.log(event)
// })

let isPlaying = false

TouchGestures.onTap().subscribeWithSnapshot({
  // Get the value of mouth openness when the tap gesture is detected
  'mouthOpennessValue': FaceTracking.face(0).mouth.openness,
}, function (gesture, snapshot) {
  Diagnostics.log('hello')

  isPlaying = !isPlaying
  Diagnostics.log(isPlaying)

  if (isPlaying) {

    // init story trie

    // subscribe to mouth
    FaceTracking.face(0).mouth.openness.monitor({ fireOnInitialValue: true }).subscribe(event => {
      let openness = event.newValue
      if (openness > 0.3 && isPlaying) { // select word
        Diagnostics.log('mouth is open!!!')
      }
    })

    
    Diagnostics.log("we're playing the game!")
    storyText.text = "Play"
  } else { // we just shut off the game
    storyText.text = 'Tap to play game'
    Diagnostics.log('helloooo')
  }
});
