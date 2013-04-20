define(['async', 'fs', 'underscore', 'config'], function (async, fs, _, config) {
	var Module = function (dirPath) {
			this.dirPath = dirPath || config.get('xmlPath');
			this.init();
		},
		Mp = Module.prototype;
	Mp.init = function () {
		this.getFilesList(function (err, data) {
			console.log(data);
		});
		return this;
	};

	Mp.getFilesList = function (callback) {
		getFilesList(this.dirPath, callback);
		return this;
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
