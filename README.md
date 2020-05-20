# TicTacToe Fun!

This package includes vanilla JS implementation of classic Tic-Tac-Toe game.

## Getting Started

Player can either compete with ``computer`` or ``real`` player. ``Computer`` mode uses [Minimax](https://en.wikipedia.org/wiki/Minimax) algorithm to find best move from game state tree. ``Real`` opponent can compete with user via `Websocket` protocol. For backend part of the project, see my other repository [TicTacToe-Server](https://github.com/caglaralkiss/tictactoe-server) 

### Prerequisites
```
node(v8 or higher)
Docker(optional)
```

### Installation

* Firstly, you need to setup backend part of the project. Follow the instructions at [TicTacToe-Server](https://github.com/caglaralkiss/tictactoe-server) repository under ``Installation`` section
* You can find installation for both `development` and `production` environments.
* After your backend server is up, check url of ws server. Default is ``ws://localhost:8080``. If you set another ip or port to run backend server, edit the URL of websocket connection at [ws-url.js](https://github.com/caglaralkiss/vanilla-xox-game/blob/master/src/constants/ws-url.js).  
* Go to project root directory.
* Execute the following command for <b>development</b>: ``npm run serve``. For <b>production</b> build, execute ``npm run build``
* Above scripts will produce ``dist`` folder which holds static files of the project.
* Navigate to ``dist`` folder and open ``index.html`` with your favorite browser.

#### Build with Docker
Alternatively, you can create a Docker container to serve static files with Nginx server. To create a container:
* Navigate to project directory in your local.
* Execute the following command for <b>development</b>:``docker build -t xox-client .`` For <b>production</b>, execute ``docker build --build-arg NODE_ENV_VAR=PRODUCTION -t xox-client .``
* After image is created, create a container with following command:
```
docker run -p 8000:80 xox-client
```
* Open your favorite browser and navigate to ``localhost:8000``.

## Running the tests

* Project uses [Jest](https://www.npmjs.com/package/jest) as testing framework.
* To run unit tests, execute `npm run test` command on the root directory of the project. 
