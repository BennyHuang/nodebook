fs=require('fs');
fs.open('file', 'w', function(err, fd){
	if(!err) {
		fs.close(fd);
	}
});

var config = {maxFiles:20, maxConnections: 16, rootPath: '/webroot'};
var configText = JSON.stringify(config);
var options = {encoding: 'utf8', flag: 'w'};
fs.writeFile('config.txt', configText, options, function(err){
	if(err) {
		console.log('config write failed');
	} else {
		console.log('config saved');
	}
});


	var options = {encoding: 'utf8', flag: 'r'};
	fs.readFile('config.txt', options, function(err, data){
	if (err) {
		console.log('Failed to open Config File');
	} else {
		console.log('Config Loaded');
		var config = JSON.parse(data);
		console.log('Max Files:' + config.maxFiles);
		console.log('Max Connections:' + config.maxConnections);
		console.log('Root Path:' + config.rootPath);
	}
});



var fruitBowl = ['apple', 'orange', 'banana', 'grapes'];
function writeFruit(fd) {
	if(fruitBowl.length) {
		var fruit = fruitBowl.pop() + ' ';
		fs.write(fd, fruit, null, null, function(err, bytes) {
			if (err) {
				console.log('File Write Failed');
			} else {
				console.log('Wrote: %s %dbytes', fruit, bytes);
				writeFruit(fd);
			}
		});
	} else {
		fs.close(fd);
	}
}

fs.open('fruit.txt', 'w', function(err, fd) {
	writeFruit(fd);
});

var grains = ['wheat', 'rice', 'oats'];
var options = {encoding: 'utf8', flag: 'w'};
var fileWriteStream = fs.createWriteStream('grains.txt', options);
fileWriteStream.on('close', function(){
	console.log('File Closed');
});
while (grains.length) {
	var data = grains.pop() + ' ';
	fileWriteStream.write(data);
	console.log('Wrote: %s', data);
}
fileWriteStream.end();



function readFruit(fd, fruits) {
	var buf = new Buffer(5);
	buf.fill();
	fs.read(fd, buf, 0, 5, null, function(err, bytes) {
		if(bytes > 0) {
			console.log('read %dbytes:', bytes);
			fruits += buf.toString();
			readFruit(fd, fruits);
		} else {
			fs.close(fd);
			console.log('Fruits: %s', fruits);
		}
	})
}

fs.open('fruit.txt', 'r', function(err, fd) {
	readFruit(fd, '');
});

var options = {encoding: 'utf8', flag: 'r'};
var fileReadStream = fs.createReadStream('grains.txt', options);
fileReadStream.on('data', function(chunk) {
	console.log('Grains: %s', chunk);
	console.log('Read %d bytes of data.', chunk.length);
});
fileReadStream.on('close', function(){
	console.log('File Closed');
});