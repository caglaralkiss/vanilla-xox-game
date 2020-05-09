const { Colors } = require('./constants');

const logger = (logLevel, message) => {
	const _log = (color, msg) => console.log(color, msg);

	switch (logLevel) {
		case 'INFO':
			_log(Colors.YELLOW, message)
			break;
		case 'ERROR':
			_log(Colors.RED, message);
			break;
		case 'SUCCESS':
			_log(Colors.GREEN, message);
			break;
		default:
			throw new Error('Unknown log level! Log level defined: ' + logLevel);
	}
}

module.exports = {
	logger
}
