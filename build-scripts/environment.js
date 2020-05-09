const { EnvironmentType } = require('./constants');
const { logger } = require('./logger');

const getCurrentEnvironment = () => {
	const env = process.env.NODE_ENV;
	const definedEnvironments = Object.values(EnvironmentType);

	if (definedEnvironments.includes(env)) {
		return env;
	} else {
		logger('ERROR', 'Unknown environment type provided!');
		process.exit(1);
	}
}

module.exports = {
	getCurrentEnvironment
};
