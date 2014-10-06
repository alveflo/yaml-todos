#!/usr/bin/env node
var app = require('./yaml-todos.js');
var program = require('commander');

var GenerateTodoList = function(name) {
	var fs = require('fs');
	fs.writeFileSync(name, '---\n', 'utf8', 'w');
	var stream = fs.createWriteStream(name);
	stream.once('open', function(name) {
		stream.write('todos:\n');
		stream.write(' - Create todos: Edit this todo-list template!\n');
		stream.write(' - Do: Do your chores!\n');
		stream.end();
	});
	fs.chmodSync(name, '755', function(err) {
		console.log('Unable to set chmod. Aborting.');
		process.exit();
	});
};

program
	.version('1.0.0')
	.option('-f, --file <filename>', 'Location of YAML-file')
	.parse(process.argv);

var filename;

if (program.file){
	filename = program.file;
	app(filename);
}
else {
	var readline = require('readline');

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	rl.question('- Please specify your YAML-file: ', function(file) {
		filename = file;
		rl.close();
		app(filename);
	});
}