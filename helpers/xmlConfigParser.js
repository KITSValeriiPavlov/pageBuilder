define(['async', 'fs', 'underscore', 'config', 'xml2js'], function (async, fs, _, config, xml2js) {
	var Module = function (dirPath) {
			this.dirPath = dirPath || config.get('xmlPath');
		},
		Mp = Module.prototype;
	Mp.init = function () {
		return this;
	};

	Mp.getFilesList = function (callback) {
		getFilesList(this.dirPath, callback);
		return this;
	};
	Mp.parseFile = function (fileName, callback) {
		var self = this;
		async.waterfall([function (cb) {
			fs.readFile(fileName, 'utf-8', cb);
		}, function (data, cb) {
			xml2js.parseString(data, cb)
		}], callback);
		return this;
	};
	Mp.getJSON = function (filename, callback) {
		var self = Mp;
		async.waterfall([
			function (cb) {
				self.parseFile(filename, cb);
			},
			function (data, cb) {
				var jsonConf = fetchJSONConf(data); 
				cb(null, jsonConf);
			}
		], function (err, data) {
			if (err) return callback(err);
			//console.log(err, data);
			callback(null, data);
		});
	};

	//private methods
	function getFilesList(dirPath, callback) {
		async.waterfall([
			function (callback) {
				fs.readdir(dirPath, callback);
			}
		], function (err, data) {
			if(err) return callback(err);
			var filesList = (_.map(data, function(item) {
				return dirPath + '/' + item;
			}));
			callback(null, filesList);
		})
	}
	
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
	return Module;
});
