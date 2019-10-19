//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

const story = {
  '': {
    word: '',
    after: [],
    children: {
      Jenny: {
        after: ['went', 'to', 'the'],
        children: {
          beach: {
            after: ['and', 'they', 'forgot', 'their'],
            children: {
              cat: {
                '.': '.'
              },
              cheetos: {
                '.': '.'
              },
              towels: {
                '.': '.'
              }
            }
          },
          mall: {
            after: ['and', 'they', 'bought', 'new'],
            children: {
              slippers: {
                '.': '.'
              },
              toothpaste: {
                '.': '.'
              },
              'Facebook Portals': {
                '.': '.'
              }
            }
          },
          castle: {
            after: ['and', 'fell', 'into', 'the'],
            children: {
              well: {
                '.': '.'
              },
              toilet: {
                '.': '.'
              },
              moat: {
                '.': '.'
              }
            }
          }
        }
      },
      Jasmine: {
        after: ['went', 'to', 'the'],
        children: {
          beach: {
            after: ['and', 'they', 'forgot', 'their'],
            children: {
              cat: {
                '.': '.'
              },
              cheetos: {
                '.': '.'
              },
              towels: {
                '.': '.'
              }
            }
          },
          mall: {
            after: ['and', 'they', 'bought', 'new'],
            children: {
              slippers: {
                '.': '.'
              },
              toothpaste: {
                '.': '.'
              },
              'Facebook Portals': {
                '.': '.'
              }
            }
          },
          castle: {
            after: ['and', 'fell', 'into', 'the'],
            children: {
              well: {
                '.': '.'
              },
              toilet: {
                '.': '.'
              },
              moat: {
                '.': '.'
              }
            }
          }
        }
      },
      Antonio: {
        after: ['went', 'to', 'the'],
        children: {
          beach: {
            after: ['and', 'they', 'forgot', 'their'],
            children: {
              cat: {
                '.': '.'
              },
              cheetos: {
                '.': '.'
              },
              towels: {
                '.': '.'
              }
            }
          },
          mall: {
            after: ['and', 'they', 'bought', 'new'],
            children: {
              slippers: {
                '.': '.'
              },
              toothpaste: {
                '.': '.'
              },
              'Facebook Portals': {
                '.': '.'
              }
            }
          },
          castle: {
            after: ['and', 'fell', 'into', 'the'],
            children: {
              well: {
                '.': '.'
              },
              toilet: {
                '.': '.'
              },
              moat: {
                '.': '.'
              }
            }
          }
        }
      }
    }
  }
};

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const TouchGestures = require('TouchGestures');
const Time = require('Time');

const face = FaceTracking.face(0);
const storyText = Scene.root.find('2dTextStory');
storyText.text = 'Tap to play game';

const optionText = Scene.root.find('2dTextOption');
optionText.text = '';

let isPlaying = false;

function changeOptionText(choices, i) {
  optionText.text = choices[i];
}

TouchGestures.onTap().subscribeWithSnapshot(
  {
    // Get the value of mouth openness when the tap gesture is detected
    mouthOpennessValue: FaceTracking.face(0).mouth.openness
  },
  (gesture, snapshot) => {
    isPlaying = !isPlaying;
    Diagnostics.log(isPlaying);

    if (isPlaying) {
      storyText.text = '';
      // init story trie
      let root = { ...story }[''];
      let choices = Object.keys(root.children);
      // let choosing = true
      Diagnostics.log('choices: ');
      Diagnostics.log(choices);

      // loop through and show choices
      let i = 0;

      const intervalTimer = Time.setInterval(() => {
        i = (i + 1) % 3;
        changeOptionText(choices, i);
      }, 500);

      let chosen = false;

      // subscribe to mouth
      FaceTracking.face(0)
        .mouth.openness.monitor({ fireOnInitialValue: true })
        .subscribe(event => {
          let openness = event.newValue;
          if (openness > 0.3 && isPlaying && !chosen) {
            // select word
            Time.clearInterval(intervalTimer);
            const chosenWord = choices[i];
            Diagnostics.log('you picked: ');
            Diagnostics.log(chosenWord);
            chosen = true;
            root = root.children[chosenWord];
            storyText.text = `${storyText.text.pinLastValue()} ${chosenWord} ${root.after.join(
              ' '
            )}`;
          }
        });

      Diagnostics.log("we're playing the game!");
    } else {
      // we just shut off the game
      storyText.text = 'Tap to play game';
      optionText.text = '';
      Diagnostics.log('helloooo');
    }
  }
);
