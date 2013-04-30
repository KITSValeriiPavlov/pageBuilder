define(['helpers/xmlConfigParser', 'helpers/fileReader', 'async', 'config'], function (XMLConfigParser, FileReader, async, config) {
	return function (pathToConfigFolder) {
		var confParser = XMLConfigParser(),
			fileReader = FileReader(),
			path = pathToConfigFolder || config.get('xmlPath');
		
		return {
			getPagesConfig : getPagesConfig,
			updatePagesConfig : updatePagesConfig
		};
		
		function convertFilesToJSON (files, callback) {
			async.map(files, confParser.getJSON, callback)
		}
		
		function getPagesConfig (callback) {
			if (!getPagesConfig.cache) getPagesConfig.cache = {};
			if (getPagesConfig.cache[path]) return callback (null, getPagesConfig.cache[path]);
			updatePagesConfig(function (err, data) {
				if (err) callback(err)
				getPagesConfig.cache[path] = data;
				callback(err, data);
			});
		}
		
		function updatePagesConfig (callback) {
			async.waterfall([
				function (cb) {
					fileReader.getFilesList(path, cb);
				},
				function (files, cb) {
					convertFilesToJSON(files, cb);
				}
			], callback);
		}
	};
});
