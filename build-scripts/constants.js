const Colors = {
	RED: '\x1b[31m',
	YELLOW: '\x1b[33m',
	GREEN: '\x1b[32m',
}

const EnvironmentType = {
	PRODUCTION: 'PRODUCTION',
	DEVELOPMENT: 'DEVELOPMENT'
}

module.exports = {
	Colors,
	EnvironmentType,
	ENV_TYPE_TOKEN: '%%CURRENT_ENVIRONMENT%%'
}
