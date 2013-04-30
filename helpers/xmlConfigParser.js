define(['async', 'helpers/fileReader', 'config', 'xml2js'], function (async, FileReader, config, xml2js) {
	return function (dirPath) {
		var dirPath = dirPath || config.get('xmlPath'),
			fileReader = FileReader();
			
		return {
			parseFile : parseFile,
			getJSON : getJSON
		};
		
		//private methods
		function fetchXMLModules(modules) {
			return modules.map(function (item,index) {
				var params = item.$,
					key = null,
					result = {};
				for (key in params) {
					result[key] = params[key];
				}
				return result;
			});
		}
		
		function fetchJSONConf(rawJSON) {
			var page = rawJSON.page,
				name = page.$.name,
				release = page.release[0].$.output,
				settings  = page.settings[0],
				modules = page.modules[0].module
			return {
				name    : name,
				release : release,
				title   : settings.title[0],
				layout  : settings.layout[0],
				modules : fetchXMLModules(modules)
			}
		}
		
		function parseFile (fileName, callback) {
			async.waterfall([function (cb) {
				fileReader.readFile(fileName, cb);
			}, function (data, cb) {
				xml2js.parseString(data, cb)
			}], callback);
		}
		
		function getJSON(filename, callback) {
			async.waterfall([
				function (cb) {
					parseFile(filename, cb);
				},
				function (data, cb) {
					var jsonConf = fetchJSONConf(data); 
					cb(null, jsonConf);
				}
			], function (err, data) {
				if (err) return callback(err);
				callback(null, data);
			});
		}
	}
});
