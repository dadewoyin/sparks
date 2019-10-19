//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');

const storyText = Scene.root.find('2dTextStory');
storyText.text = 'This is the story!';

const optionText = Scene.root.find('2dTextOption');
optionText.text = '';

class Queue {
  constructor() {
    this._storage = [];
  }

  enqueue(val) {
    this._storage.push(val);
  }

  dequeue() {
    return this._storage.shift();
  }

  size() {
    return this._storage.length;
  }
}

const showOptions = node => {
  const choicesQueue = new Queue();

  for (let i = 0; i < node.children.length; i++) {
    choicesQueue.enqueue(node.children[i]);
  }

  while (choicesQueue.size()) {
    const choiceNode = choicesQueue.dequeue();
    choicesQueue.enqueue(choiceNode);

    optionText.text = choiceNode.word;

    // setTimeout()
    // TODO: add logic to select a node
  }
};

const selectNode = () => {};
// How to log messages to the console (uncomment line below to activate)
Diagnostics.log(optionText.text.pinLastValue());

// Face Tracking

const FaceTracking = require('FaceTracking');

const face = FaceTracking.face(0);

// Diagnostics.log(face.mouth);
Diagnostics.log(face.mouth.openness.pinLastValue());
