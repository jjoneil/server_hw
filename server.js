//pulls in http library so we can use it
var http = require("http");

//pull in the file system module to access our files
var fs = require("fs");

var pageCount = parseInt(fs.readFileSync('./count.txt'));

function updateCount(fileName, pageCount){
		var newvalue = pageCount;
		fs.writeFile(fileName, newvalue, function(err){
		//fs.writeFile(filename, newcontents, callback)`
			if(err){
				console.log(err);
				return
			}
			//consolelog success
		});
}

//

var server = http.createServer(function(req, res){
	if(req.url === "/") { //local host 8080, homepge
		fs.readFile("./cats.html", function(err, data){ 
			res.write(data);
			pageCount = pageCount + 1;
			updateCount('./count.txt', pageCount);
			res.end();
			//impliment some more stuff
		});
	} else if (req.url === '/count'){ //count page
		fs.readFile("./count.txt", function(err, data){
			res.write(data);
			res.end();
			//some stuff about times site visited
		});
	}
});


//listen for new connections on this port
//must be between 1025 - 65535 (all lower than 1025 are administrative. Don't run )
server.listen(8080);

console.log("working");