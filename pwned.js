const crypto = require('crypto');
const https = require('https');
const bs = require('binary-search');
const csv = require('csv-parse');
const program = require('commander');
const chalk = require('chalk');

const pwnedURL = 'https://api.pwnedpasswords.com/range/';
const pwnedPrefixLength = 5;

function setupCommander(){
	program
	.version('0.1.0')
	//.option('-p, --peppers', 'Add peppers')
	.option('--csv <csv file>', 'Read passwords from a .csv file', './Chrome Passwords.csv')
	.option('-s, --safe', 'Display safe passwords', false)
	.parse(process.argv);
	
	if(program.csv){
		const csvparser = require('./csvparser');
		csvparser.parsefile(program.csv, checkpasswords);
	}
}

function checkDB(element, callback) {
	let shaPrefix = element.sha1.substring(0, pwnedPrefixLength);
	let shaRest = element.sha1.substring(pwnedPrefixLength);
	https.get(pwnedURL + shaPrefix, (res) => {
		/* istanbul ignore if (its never met)*/
		if (res.statusCode !== 200)
			throw new Error('Status code: ' + res.statusCode);

		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			//callback(createResultObjc(element.sha1, searchInResults(data, shaRest)));
			let result = searchInResults(data, shaRest);
			element.pwned = result === undefined ? false : result.substring(shaRest.length + 1);
			callback(element);
		});

	}).on('error', (e) => {		
		/* istanbul ignore next (error throw)*/
		console.error(e);
	});
}

function sha1Encrypt(password) {
	return crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
}

function searchInResults(results, shaRest) {
	const resList = results.split('\r\n');

	const pos = bs(resList, shaRest, function (element, needle) {
		return element.substring(0, needle.length).localeCompare(needle);
	});
	return resList[pos];
}

function makeResultObjc(site, pass, sha1, pwned) {
	return {
		site: null,
		pass: null,
		sha1: sha1,
		pwned: pwned === undefined ? false : pwned.substring(sha1.length + 1 - pwnedPrefixLength)
	}
}

function analyzeResultObject(result, showSafe) {
	if (!showSafe && !result.pwned)
		return;

	let id = result.name !== undefined ? result.name : (result.pass === undefined ? result.sha1 : result.pass);
	if (!result.pwned)
		console.log(chalk.green('Your ' + id + ' password is safe'));
	else
		console.log(chalk.red('Your ' + id + ' password got pwned ' + result.pwned + ' times'));
}

function onComplete(result, showSafe) {
	console.log(chalk.cyan.bold('\nDont forget to delete '+program.csv));
}

/* istanbul ignore if (CLI only)*/
if(!module.parent)	//is CLI
	setupCommander();

function checkpasswords(passwordlist, isSHA1) {

	if(!passwordlist || passwordlist.length<=0)
		return;

	if(objectHasProperties(passwordlist[0])){
		var passProcessed = 0;
		var passLenght = passwordlist.length;
		passwordlist.forEach(function(element){
			if(!element.hasOwnProperty('sha1')){
				element.sha1 = sha1Encrypt(element.password);
			}
			checkDB(element, function (obj) {
				++passProcessed;
				analyzeResultObject(obj, program.safe, passProcessed, passLenght);
				if (passProcessed == passLenght)
					onComplete();
			});
		});
	}
	else{
		if(isSHA1){}
		else{}
	}
}

function objectHasProperties(object) {
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) {
			return true;
		}
	}
	return false;
}

var exports = module.exports = {};
if(true){
	exports.checkpasswords = checkpasswords;
	exports.objectHasProperties = objectHasProperties;
	exports.sha1Encrypt = sha1Encrypt;
}