define(['helpers/pagesConfig','async'], function(PagesConfig, async) {
	return function(app) {
		
		var pagesConfig = new PagesConfig();
		app.get('/', function (req, res) {
			pagesConfig.getPagesConfig(function (err, data) {
				res.render('index', {
					title: 'Express',
					pages : data
				});
			});
		});
	};
});