# Pixi Slot Reel Component

## How to run

Just open index.html in a browser

## Project structure

* index.html creates spin audio and button, win text, initializes main.js
* main.js initializes plugins, reel, spin button, and win text
* components manipulates canvas
    * Reel.js initializes the pixi application, symbols; controls them
    * Symbol.js is a recyclable symbol
* services
    * initPlugins.js initializes plugins
* utils
    * getRandomArrayElement.js returns random array element
    * audio
      * clampAudioPlaybackRate.js help to meet browser requirements
    * math
      * clamp.js returns a clamped value
* assets
    * audio
        * spin.wav plays on Reel.spin