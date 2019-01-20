const crypto = require('crypto');
const https = require('https');
const bs = require('binary-search');
const csv = require('csv-parse');
const program = require('commander');

const pwnedURL = 'https://api.pwnedpasswords.com/range/';
const pwnedPrefixLength = 5;

function setupCommander(){
	program
	.version('0.1.0')
	//.option('-p, --peppers', 'Add peppers')
	.option('--csv <csv file>', 'Read passwords from a .csv file', 'csv file')
	.parse(process.argv);

	/*console.log('you ordered a pizza with:');
	if (program.peppers) console.log('  - peppers');
	if (program.pineapple) console.log('  - pineapple');
	if (program.bbqSauce) console.log('  - bbq');
	console.log('  - %s cheese', program.cheese);*/
	if(program.csv){
		const csvparser = require('./csvparser');
		csvparser.parsefile(program.csv, checkpasswords);
	}

}

function checkDB(element, callback) {
	let shaPrefix = element.sha1.substring(0, pwnedPrefixLength);
	let shaRest = element.sha1.substring(pwnedPrefixLength);
	https.get(pwnedURL + shaPrefix, (res) => {
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

function analyzeResultObject(result, ignoreSafe) {
	if (ignoreSafe && !result.pwned)
		return;

	let id = result.name !== undefined ? result.name : (result.pass === undefined ? result.sha1 : result.pass);
	if (!result.pwned)
		console.log('Your ' + id + ' password is safe');
	else
		console.log('Your ' + id + ' password got pwned ' + result.pwned + ' times');
}

setupCommander();

function checkpasswords(passwordlist, isSHA1) {
	if(objectHasProperties(passwordlist[0])){
		passwordlist.forEach(function(element){			
			if(!element.hasOwnProperty('sha1')){
				element.sha1 = sha1Encrypt(element.password);
			}
			checkDB(element, function (obj) {
				analyzeResultObject(obj);
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
