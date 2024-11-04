WORDLE
Description: wordle is a word guessing game. Normally five letter word is used as base to play the game. Player has to enter the five letter word to guess the right answer. No hints are provided at the begining. Each letter of the word guessed will be colour marked for hint. White marked letter means letter is not present in the answer. Yellow marked letter means letter is present in the answer but not in the right place as in the answer. Green marked letter means letter is present in the answer and placement of the letter is exactly same as in the answer.

Prerequisites for configuring the game: Node version 18.0 or more required to run both the client side as well as server side
MongoDB is required to persist the data and build the persistant layer of the server
Database named wordle should be there in the mongoDB, no need to add any collection to it as while starting the server all the required collections will be configured by the server itself.
single document can be inserted in the collection named settings as provided below for default configuration
{
"number_of_attempts": 3,
"candidates": [
"ahead",
"alarm",
"boost",
"today",
"ravin"
]
}

How to run the game: For running server, please make sure that node version 18.0 or more is already installed on the system. direct the prompt to the server folder of the repository. Run command "npm run dev" to start the development server. Insert the document provided, as in the last section, in the settings collection of local mongoDB instance running on the system. For running client side, direct prompt to frontend folder of the repository and run command "npm run dev", client side will be running on localhost:5173 of the system.

Player can configure the number of attempts allowed in one single game to guess the word. Player can also configure the list of candidate words, from which one of the candidate word is randomly chosen by the system to be answer for the respective iteration of the game.
