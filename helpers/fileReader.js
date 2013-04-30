define(['async', 'fs'], function (async, fs) {
	return function () {
		return {
			getFilesList : function (dirPath, callback) {
				getFilesList(dirPath, callback);
			},
			readFile : function (path, callback) {
				fs.readFile(path, 'utf-8', callback);
			}
		};
		
		function getFilesList(dirPath, callback) {
			async.waterfall([
				function (callback) {
					fs.readdir(dirPath, callback);
				}
			], function (err, data) {
				if(err) return callback(err);
				var filesList = data.map(function(item) {
					return dirPath + '/' + item;
				});
				callback(null, filesList);
			});
		}
	};
});
