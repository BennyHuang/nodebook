fs = require('fs');
fd = fs.openSync('file', 'w');
fs.closeSync(fd);

var veggieTray = ['carrots', 'celery', 'olives'];
fd = fs.openSync('veggie.txt', 'w');
while(veggieTray.length) {
	veggie = veggieTray.pop() + ' ';
	var bytes = fs.writeSync(fd, veggie, null, null);
	console.log('Wrote %s %dbytes', veggie, bytes);
}
fs.closeSync(fd);

fd = fs.openSync('veggie.txt', 'r');
var veggies = '';
do {
	var buf =  new Buffer(5);
	buf.fill();
	var bytes = fs.readSync(fd, buf, null, 5);
	console.log('read %dbytes', bytes);
	veggies += buf.toString();
} while (bytes > 0);
fs.closeSync(fd);
console.log('Veggies:' + veggies);