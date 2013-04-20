define(['helpers/xmlConfigParser', 'config'], function(xmlConfParser, config) {
	return function(app) {
		
		new xmlConfParser();
		app.get('/', test);
		function test (req, res) {
			res.render('index', {
				title: 'Express',
				pages : [1,2,3,4,5]
			});
		}
	};
});