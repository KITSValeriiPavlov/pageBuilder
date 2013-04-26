define(['helpers/xmlConfigParser', 'config', 'fs', 'async'], function(xmlConfParser, config, fs, async) {
	return function(app) {
		
		var confParser = new xmlConfParser();
		app.get('/', test);
		function test (req, res) {
			confParser.getFilesList(function (err, data) {
				if (err) res.end(err);
				async.map(data, confParser.parseFile, function (err, data) {
					if (err) res.end(err);
					res.render('index', {
						title: 'Express',
						pages : data
					});
				})
			});
		}
	};
});