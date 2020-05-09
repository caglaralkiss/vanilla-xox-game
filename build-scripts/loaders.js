const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { logger } = require('./logger');
const { getCurrentEnvironment } = require('./environment');
const { ENV_TYPE_TOKEN } = require('./constants');

const makeDistFolder = async () => {
	try {
		return fs.promises.mkdir('./dist', { recursive: true });
	} catch (e) {
		logger('ERROR', 'Cannot create dist folder. Error: ' + e);
		process.exit(1);
	}
}

const copySrc = async () => {
	try {
		return fsExtra.copy('./src', './dist/src');
	} catch (e) {
		logger('ERROR', 'Cannot copy src folder. Error: ' + e);
		process.exit(1);
	}
}

const copyHtml = async () => {
	try {
		const currEnv = getCurrentEnvironment();
		const templateSrcFileDir = './index.html';
		const templateDestinationPath = './dist/index.html'

		const template = await fs.promises.readFile(templateSrcFileDir, 'utf-8');
		const envInjectedTemplate = template.replace(ENV_TYPE_TOKEN, currEnv);

		return fs.promises.writeFile(templateDestinationPath, envInjectedTemplate, 'utf-8');
	} catch (e) {
		logger('ERROR', "Cannot copy the template. " + e);
		process.exit(1);
	}
}

const copyAssets = async () => {
	try {
		const assetSrcFolder = path.join(__dirname, './assets');
		const assetDestFolder = path.join(__dirname, './dist/assets');

		return fsExtra.copy(assetSrcFolder, assetDestFolder);
	} catch (e) {
		logger("ERROR", 'Cannot copy assets folder. ' + e);
		process.exit(1);
	}
}

module.exports = {
	makeDistFolder,
	copySrc,
	copyHtml,
	copyAssets
}
