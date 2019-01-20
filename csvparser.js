const fs = require('fs');
const parse = require('csv-parse');
const assert = require('assert');

var exports = module.exports = {};

// Create the parser
exports.parsefile = function(file, callback) {
	//const input = '"1","2","3","4"\n"a","b","c","d"';

	var input = fs.readFileSync(file, 'utf8');	parse(input, {
		delimiter: ','
	}, function(err, output){
		for(let i=1;i<output.length;++i){
			let newOutput = {};
			for(let j=0;j<output[0].length;++j){
					newOutput[output[0][j]] = output[i][j];
			}
			output[i] = newOutput;
		}
		output.shift();
		callback(output);
	});
}
