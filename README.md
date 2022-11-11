# Social Network API

## Description

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A social network web API where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Clone or fork this repository and run npm start or node index.js in order to start the API.

## Usage

### List of endpoints and their methods:

* /api/users/
  * GET, POST
  * Sample POST body: ```{
    "username": "Joeshmo",
    "email": "js@abc.com"
    }```
* /api/users/{userId}
  * GET, PUT, DELETE
  * Sample PUT body: ```{
    "username": "JoeKing1854",
    "email": "joe@abc.com"
    }```
* /api/users/{userId}/friends/{friendId}
  * POST, DELETE
* /api/thoughts/
  * GET, POST
  * Sample POST body: ```{
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "636c4d7a0deebb57efad2f30"
    }```
* /api/thoughts/{thoughtId}
  * GET, PUT, DELETE
  * Sample PUT body: ```{
    "username": "newUser"
    }```
* /api/thoughts/{thoughtId}/reactions
  * POST
  * Sample POST body: ```{
    "reactionBody": "This is a new reaction!",
    "username": "somebody else"
    }```
* /api/thoughts/{thoughtId}/reactions/{reactionId}
  * DELETE

## Credits

Michael Sinn - GitHub: https://github.com/MichaelSinn

## License

This project is covered under the license of MIT. More information about this
license: https://opensource.org/licenses/MIT
