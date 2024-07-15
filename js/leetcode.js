// read google.json file and display the content

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'google.json');

fs.readFile
