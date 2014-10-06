var fs = require('fs');
var	yaml = require('js-yaml');
var watch = require('node-watch');


module.exports = function(file) {
	var WebSocketServer;
	var wss;
	var websocket;
	var sendJSON = function() {
		try {
			var yamlText;
			var json;
			try {
				yamlText = fs.readFileSync(file, 'utf8');
				json = yaml.safeLoad(yamlText);

			}
			catch(e) {
				yamlText = 'Unable to read file ' + file;
				json = { error: yamlText };
			}
			websocket.send(JSON.stringify(json));
		}
		catch (e) {
			websocket.send(JSON.stringify({ error: e }));
		}
	};

	try {
		console.log('Starting web socket server at port 81...');
		WebSocketServer = require('ws').Server;
		wss = new WebSocketServer({port: 81});
		console.log('Web socket server running on port 81!');
	}
	catch (e) {
		console.log("Unable to start web socket server at port 81:");
		console.log(e.toString());
		process.exit();
	}

	console.log('Trying to create todo-list from %s.', file);
	try {
		// Validate yaml
		try {
			var json = yaml.safeLoad(fs.readFileSync(file, 'utf8', 'r'));
			if (json == null) {
				console.log('Unable to parse YAML.');
				process.exit();
			}
		}
		catch (e) {
			console.log('Unable to parse YAML:')
			console.log('Message: ' + e);
			process.exit();
		}
	}
	catch (e) {
		console.log("Unable to open file: %s, make sure it exists. Aborting.", file);
		process.exit();
	}

	wss.on('connection', function(ws) {
		websocket = ws;
		ws.on('message', function(message) {
			console.log('Received: %s', message)
		});
		sendJSON();
	});

	watch(file, function() {
		try {
			if (websocket != null) {
				sendJSON();
			}
		}
		catch (e) {
			console.log(e);
		}
	});

	console.log('Done.');
	try {
		var open = require('open');
		open(__dirname + '/index.html');
	}
	catch (e) {
		// Unable to open browser...
	}
	console.log('App is running!');
}