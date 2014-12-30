var childProcess = require('child_process');
var options = {maxBuffer:100*1024, encoding:'utf8', timeout:5000};
var child = childProcess.exec('node cluster_server.js', options, function(error, stdout, stderr){
	if(error) {
		console.log(error);
	} else {
		// console.log(stdout);
		// console.log(stderr);
	
	}
});
// child.stdout.on('data', function(data){
// 	console.log(data);
// });