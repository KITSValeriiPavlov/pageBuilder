
var requirejs = require('requirejs'),
	app = null;

	requirejs.config({
		baseUrl: __dirname,
		rout : 'routes',
		nodeRequire: require
	});

requirejs(['express', 'routes/mainRouter'], function (express, mainRouter) {
	app = module.exports = express.createServer();
	// Configuration
	
	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});
	
	app.configure('development', function() {
		app.use(express.errorHandler({
			dumpExceptions : true,
			showStack : true
		}));
	});
	
	app.configure('production', function() {
		app.use(express.errorHandler());
	});
	
	// Routes
	mainRouter(app);

	app.listen(8000, function() {
		console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
	}); 
});