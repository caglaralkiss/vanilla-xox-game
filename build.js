const { makeDistFolder,copySrc, copyHtml } = require('./build-scripts/loaders');
const { logger } = require('./build-scripts/logger');

(async () => {
    logger('INFO', "Build pipeline started...");

    logger("INFO", "Dist folder is creating/overwriting")
    await makeDistFolder();
    logger('SUCCESS', 'Dist folder created successfully!');

    logger('INFO', 'Scripts and styles are copying to dist folder...');
    await copySrc();
    logger("SUCCESS", "Scripts and styles are copied successfully!");

	logger("INFO", 'HTML file is copying to dist folder...');
	await copyHtml();
	logger("SUCCESS", 'HTML file is copied successfully to dist folder!');

	logger("SUCCESS", "Build pipeline succeeded!");
})();

