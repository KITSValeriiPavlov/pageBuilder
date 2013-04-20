define([],function() {
	return requirejs(['fs', 'xml2js', 'config'], function (fs, xml2js, config) {
		var cache = {},
			parseString = xml2js.parseString,
			xmlPath = config.path.xml;

		function getPageConfig (path, callback) {
			fs.readFile(path, "utf-8", function (err, data) {
				if (err) return callback(err);
				var separator = path.indexOf('/') !== -1 ? '/' : '\\',
					chunks = path.split(separator),
					name = chunks[chunks.length - 1];

				parseString(data, function (err, json) {
					if (err) callback(err);
					callback(null, {
						name : name,
						data : JSON.stringify(json)
					});
				})

			});
		}
		function getFilesList(dirPath, callback) {
			//if (!fs) var fs = require('fs');
			console.log('dirPath : ' + dirPath)
			fs.readdir(dirPath, function (err, data) {
				if (err) return callback(err, null);
				callback(null, data);
			});
		}
		function iterator(elems, handler, callback) {
			var results = [];
			(function recursor(items) {
				if (!items.length) return callback(null, results);
				var item = items.shift();
				handler(item, function (err, data) {
					if (err) callback(err, result);
					results.push(data);
					recursor(items);
				});
			})(elems);
		}
		function getFullFilesPath (files, prefix) {
			var separator = config.pathSeparator;
			return files.map(function (fileName) {
				return prefix + separator + fileName;
			});
		}
		getFilesList(xmlPath, function (err, files) {
			var filesList = getFullFilesPath(files, xmlPath);

			/*iterator(filesList, getPageConfig, function (err, data) {
				res.render('index', {
					title: 'Express',
					pages : data
				});
			});*/
		});
	});
});