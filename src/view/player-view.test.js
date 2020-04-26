require('../util/dom');
require('../constants/square-state');
require('./player-view');
require('../model/player');

describe('PlayerView', function () {
	const parser = new DOMParser();
	const PlayerView = window.app.View.PlayerView;
	const Player = window.app.Model.Player;
	const SQUARE_STATE = window.app.Constants.SQUARE_STATE;


	const MOCK_DATA = {
		player: {
			id: 0,
			name: 'Caglar',
			mark: SQUARE_STATE.X,
			score: 20
		},
		opponent: {
			id: 1,
			name: 'Kasparov',
			mark: SQUARE_STATE.O,
			score: 40
		}
	};
	const TEST_TEMPLATE =
		`<div id="root">
			<div class="player" id="player">
				<div class="player__name"></div>
				<div class="player__score"></div>
				<div class="player__mark"></div>
			</div>
			<div class="player" id="opponent">
				<div class="player__name"></div>
				<div class="player__score"></div>
				<div class="player__mark"></div>
			</div>
		</div>`;

	let TEST_DOC;

	beforeEach(function () {
		TEST_DOC = parser.parseFromString(TEST_TEMPLATE, 'text/html').body;

		document.body = TEST_DOC;
	});

	it('should create', function () {
		const { id: playerId, name: playerName, mark: playerMark, score: playerScore } = MOCK_DATA.player;
		const { id: opponentId, name: opponentName, mark: opponentMark, score: opponentScore } = MOCK_DATA.opponent;

		const playerModel = new Player(playerId, playerName, playerMark, playerScore);
		const opponentModel = new Player(opponentId, opponentName, opponentMark, opponentScore);

		const playerView = new PlayerView(playerModel);
		const opponentView = new PlayerView(opponentModel, true);

		expect(playerView.getName()).toEqual(playerName);
		expect(playerView.getScore()).toEqual(playerScore + '');
		expect(playerView.getMark()).toEqual(playerMark);

		expect(opponentView.getName()).toEqual(opponentName);
		expect(opponentView.getScore()).toEqual(opponentScore + '');
		expect(opponentView.getMark()).toEqual(opponentMark);
	});

	it('should set name, mark and score of a Player correctly', function () {
		const { name, score, mark } = {
			name: 'Mr.X',
			score: 100,
			mark: SQUARE_STATE.O
		};

		const playerView = new PlayerView();

		// Values are either undefined or empty string.
		expect(playerView.getName()).not.toEqual(name);
		expect(playerView.getMark()).not.toEqual(mark);
		expect(playerView.getScore()).not.toEqual(score);

		playerView.setName(name);
		playerView.setMark(mark);
		playerView.setScore(score);

		expect(playerView.getName()).toEqual(name);
		expect(playerView.getMark()).toEqual(mark);
		expect(playerView.getScore()).toEqual(score + '');

	})
});
