var fs = require('fs'),
	yaml = require('js-yaml');



module.exports = function(file) {
	try {
		var json = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
		console.log(JSON.stringify(json, null, 4));
	}
	catch (e) {
		console.log(e);
	}
}