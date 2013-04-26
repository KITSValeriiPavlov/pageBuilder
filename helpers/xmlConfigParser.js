define(['async', 'fs', 'underscore', 'config', 'xml2js'], function (async, fs, _, config, xml2js) {
	var Module = function (dirPath) {
			this.dirPath = dirPath || config.get('xmlPath');
			//this.parse = xml2js.parseString;
			//this.init();
		},
		Mp = Module.prototype;
	Mp.init = function () {
		/*this.getFilesList(function (err, data) {
			console.log(data);
		});*/
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
	};

	//privat methods
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
	return Module;
});
