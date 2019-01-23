const assert = require('assert');

var pwned = { path: './pwned' };
var csvparser = { path: './csvparser' };

describe(pwned.path, function() {
	testDefinedModule(pwned);
	describe('#sha1Encrypt(password)', function() {
		testDefinedModule(pwned);
		pwned.module = require(pwned.path);
		it('Basic testbench', function() {
			sha1Test = [
				['0000', '39DFA55283318D31AFE5A3FF4A0E3253E2045E43'],
				['1234', '7110EDA4D09E062AA5E4A390B0A572AC0D2C0220'],
				['4321', 'D5F12E53A182C062B6BF30C1445153FAFF12269A'],
				['abcd', '81FE8BFE87576C3ECB22426F8E57847382917ACF'],
				['ABCD', 'FB2F85C88567F3C8CE9B799C7C54642D0C7B41F6'],
				['@#!@#!', 'C4D4D5C6644C98518343D7F62FD6E42515F59F0B'],
				['#!@#!@', '05EC3C1D85D89892067AC510CC3C06BE9B879C9B'],
			];

			for(let i=0;i<sha1Test.length;++i){
				assert.equal(pwned.module.sha1Encrypt(sha1Test[i][0]), sha1Test[i][1]);
			}
		});
	});
});

describe(csvparser.path, function() {
	testDefinedModule(csvparser);
	csvparser.module = require(csvparser.path);
	describe('#parsefile(file)', function() {
		testDefinedFunction(csvparser.module, 'parsefile');
		it('Inexistent file', function() {
			/*try {
				csvparser.module.parsefile('Inexistent file');
			} catch (e) {
				console.log(e);
			}*/
			assert.throws(function() {
				csvparser.module.parsefile('Inexistent file');
			}, {
				code: 'ENOENT'
			});
		});

		it('Undefined file', function() {
			/*try {
				csvparser.module.parsefile('Inexistent file');
			} catch (e) {
				console.log(e);
			}*/
			assert.throws(function() {
				csvparser.module.parsefile(undefined);
			}/*, {code: 'ERR_INVALID_ARG_TYPE'}*/);
		});

		it('null file', function() {
			/*try {
				csvparser.module.parsefile('Inexistent file');
			} catch (e) {
				console.log(e);
			}*/
			assert.throws(function() {
				csvparser.module.parsefile(null);
			}/*, {code: 'ERR_INVALID_ARG_TYPE'}*/);
		});

		it('Test file', function() {
			try {
				csvparser.module.parsefile('test/test.csv');
			} catch (e) {
				console.log(e);
			}
			/*assert.throws(function() {
				csvparser.module.parsefile('Inexistent file');
			}, {
				code: 'ENOENT'
			});*/
		});
	});
});

/* AUX FUNCTIONS */

function testDefinedModule(moduleObj){	
	it('defined module', function() {
		assert.doesNotThrow(function(){
			require(moduleObj.path);
		});
	});
}

function testDefinedFunction(module, fn){
	return it('defined function', function() {
		assert.notEqual(typeof module[fn] === 'function');
	});
}