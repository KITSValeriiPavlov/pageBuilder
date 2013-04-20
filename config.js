define([], function () {
	return (function () {
		var conf = {
			pathSeparator : '/',
			xmlPath : '/home/greyd/darwin/2012_modular/WebContent/WEB-INF/config/sites/diy'
		}
		return {
			get : function (param) {
				return conf[param];
			},
			set : function (param, value) {
				conf[param] = value;
				return value;
			}
		}
	}());
});
