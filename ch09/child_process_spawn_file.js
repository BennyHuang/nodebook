var spawn = require('child_process').spawn;
var options = {
	env: {user: 'brad'},
	detached: false,
	stdio: ['pipe', 'pipe', 'pipe']
};
var child = spawn('netstat', ['-e'], options);
child.stdio[1].on('data', function(data) {
	console.log(data.toString());
});
child.stdio[2].on('data', function(data) {
	console.log(data.toString());
});
child.on('exit', function(code) {
	console.log('Child exited with code: ' + code);
});
