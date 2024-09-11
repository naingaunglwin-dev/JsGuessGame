<div align="center">

# Guesser Game Documentation

</div>

## Overview
The `Guesser` game is a simple number guessing game where players try to guess a randomly generated number within a specified range. The range changes based on the selected difficulty level (Easy, Medium, Hard), and the player receives feedback based on how close their guess is to the randomly generated number. Scores are awarded based on the number of guesses and the selected difficulty level.

## Constants
- LEVEL: An object defining the difficulty levels:
  - LEVEL.EASY: "level-easy"
  - LEVEL.MEDIUM: "level-medium"
  - LEVEL.HARD: "level-hard"

## Guesser Object
The `Guesser` object holds the game state and game logic. It contains the following properties and methods:

- ### Properties
  - level: The current difficulty level. Default is LEVEL.EASY.
  - match: Tracks the number of successful guesses (wins).
  - guess: The number of guesses made in the current game.
  - random: The random number generated for the current game.
  - score: The player's total score.

- ### Methods

- **`Guesser.init()`**

  Initializes the game by setting up event listeners and starting the first game.

  - Calls `Guesser.nextgame()` to enable the "next game" button functionality.
  - Calls `Guesser.restart()` to set up the restart functionality.
  - Attaches a click listener to the level selection buttons.
  - Initializes the random number for the current game by calling `Guesser.randomNum(__min, __max)`.
  - **Returns**: The Guesser object.


- **`Guesser.randomNum(min, max)`**

  Generates a random integer between the given min and max values (inclusive).

  - min: Minimum value (inclusive).
  - max: Maximum value (inclusive).
  - **Returns**: A random integer between min and max.


- **`Guesser.range(min, max)`**
  Generates an array of numbers between min and max (inclusive).

  - min: Starting value.
  - max: Ending value.
  - **Returns**: An array of integers between min and max.


- **`Guesser.randomMaxAndMin()`**

  Calculates the random min and max values based on the current difficulty level. The range is adjusted dynamically for each difficulty level:

  - EASY: Random min is selected, and max is 10 units greater than min.
  - MEDIUM: min is selected from the first 50 values of an array or randomly chosen again, and max is 40 units greater.
  - HARD: min is set to 1, and max is 99.
  - **Returns**: An object containing min and max values.


- **`Guesser.run()`**

  Main game logic for handling guesses. Sets up the game UI and listens for the user's guess submission. Provides feedback based on whether the guess is correct, too high, or too low. Updates the game score and UI accordingly.


- **`Guesser.changelvl(clicked)`**
  Handles the change of difficulty level when a player clicks on one of the level selection buttons.

  - clicked: The button element that was clicked. It updates the current game level, resets the active button, and starts a new game.


- **`Guesser.newgame()`**

  Resets the game state and starts a new game by generating a new random number and resetting the guess counter and other game elements. Updates the game UI accordingly.


- **`Guesser.nextgame()`**

  Attaches a click event to the "Next Game" button, triggering Guesser.newgame() when clicked.


- **`Guesser.restart()`**

  Attaches a click event to the "Restart" button. Resets the score, matches, and starts a new game by calling Guesser.newgame().


- **`Guesser.sound(sound, speed = 1)`**

  Plays a sound file based on the given sound name and adjusts the playback speed.

  - sound: Name of the sound file (e.g., 'wrong', 'winner').
  - speed: Playback speed (default is 1).


- **`Guesser.POINT(level, guess, score)`**

  Calculates the player's score based on the difficulty level and the number of guesses.

  - level: The current game level (Easy, Medium, or Hard).
  - guess: The number of guesses made.
  - score: The current score.
  - **Returns**: The updated score.

## UI Elements (Guesser.btn, Guesser.block)

The Guesser object uses the following DOM elements to interact with the game UI:

- **`Buttons (Guesser.btn)`**
  - submit: Submit guess button.
  - next: "Next Game" button.
  - restart: Restart button.
  - level: Collection of difficulty level buttons (Easy, Medium, Hard).
  - Blocks (Guesser.block)
  - condition: Displays feedback messages about the guess (e.g., "Almost there" or "Please try again").
  - title: Displays the current game title, including the guess range.
  - guess: Displays the number of guesses made in the current game.
  - matches: Displays the number of games won (successful guesses).
  - answer: The input field where the player enters their guess.
  - score: Displays the player's total score.

- **`Messages (Guesser.messages)`**

  Guesser.messages provides dynamic feedback to the player based on their input:

  - condition(data): Returns a message based on the type of condition (almost, fail, only, empty, correct).
  - title(min, max): Returns the game title message, showing the range for guessing (between min and max).

- **Sound Effects**

  The game uses sound effects for different game events:

  - wrong: Plays when the player's guess is incorrect.
  - winner: Plays when the player guesses the correct number.

- **Scoring**

  The game awards points based on the difficulty level and the number of guesses made:

  - Hard: Awards up to 15 points for a 1-guess win, with fewer points as guesses increase.
  - Medium: Awards up to 8 points for a 1-guess win.
  - Easy: Awards up to 5 points for a 1-guess win.

## Example Usage

```js
// To initialize the game:
window.onload = () => {
    Guesser.init().run();
};

//This will set up the game, random number generation, button functionality, and user input handling.
```
