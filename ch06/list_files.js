var fs = require('fs');
var path = require('path');
function WalkDirs(dirPath) {
	console.log(dirPath);
	fs.readdir(dirPath, function(err, entries){
		for (var idx in entries) {
			var fullPath = path.join(dirPath, entries[idx]);
			(function(fullPath) {
				fs.stat(fullPath, function(err, stats) {
					if(stats && stats.isFile()) {
						console.log(fullPath);
					} else {
						WalkDirs(fullPath);
					}
				});
			})(fullPath)
		}
	});
}
WalkDirs('.');