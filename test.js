/**********************************************
RUN WITH:
mocha
npm test
istanbul cover ./node_modules/mocha/bin/_mocha
**********************************************/

const assert = require('assert');

var pwned = { path: './pwned' };
var csvparser = { path: './csvparser' };

describe(pwned.path, function() {
	testDefinedModule(pwned);
	pwned.module = require(pwned.path);
	describe('#sha1Encrypt(password)', function() {
		testDefinedFunction(pwned.module, 'sha1Encrypt');
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
	describe('#objectHasProperties(object)', function() {
		testDefinedFunction(pwned.module, 'objectHasProperties');
		it('Undefined', function() {
			assert.equal(pwned.module.objectHasProperties(undefined), false);
		});
		it('null', function() {
			assert.equal(pwned.module.objectHasProperties(null), false);
		});
		it('With no properties', function() {
			assert.equal(pwned.module.objectHasProperties({}), false);
		});
		it('With properties', function() {
			assert.equal(pwned.module.objectHasProperties({test: true}), true);
		});
	});
	describe('#checkpasswords(passwordlist, isSHA1)', function() {
		testDefinedFunction(pwned.module, 'checkpasswords');
		it('Undefined', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(undefined)});
		});
		it('null', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(null)});
		});
		it('empty list', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([])});
		});
		it('Element with no properties', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([{}])});
		});
		it('Element with sha', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([{
				sha1: '39DFA55283318D31AFE5A3FF4A0E3253E2045E43'
			}])});
		});
		it('Element without sha', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([{
				password: '1234'
			}])});
		});
	});
	describe('#checkpasswords(passwordlist, isSHA1, showSafe)', function() {
		testDefinedFunction(pwned.module, 'checkpasswords');
		it('Undefined', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(undefined)});
		});
		it('null', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(null)});
		});
		it('empty list', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([])});
		});
		it('Element with no properties', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([{}])});
		});
		it('Element with sha', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords([{
				sha1: '39DFA55283318D31AFE5A3FF4A0E3253E2045E43'
			}])});
		});
		it('Element without sha', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(
				[{
					password: '1234'
				},{
					password: makeSafePass()
				}], undefined, false)
			});
		});
		it('Element without sha & show safe', function() {
			assert.doesNotThrow(()=>{pwned.module.checkpasswords(
				[{
					password: '1234'
				},{
					password: makeSafePass()
				}], undefined, true)
			});
		});
	});
	describe('#setupCommander()', function() {
		testDefinedFunction(pwned.module, 'setupCommander');
		it('run', function() {
			assert.throws(()=>{pwned.module.setupCommander()}, {
				code: 'ENOENT'
			});
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

		it('Test file (no callback)', function() {
			assert.doesNotThrow(() => {csvparser.module.parsefile('test assets/test.csv')});
		});

		it('Test file (callback)', function() {
			assert.doesNotThrow(() => {csvparser.module.parsefile('test assets/test.csv', ()=>{})});
		});
	});
});

/* AUX FUNCTIONS */

function testDefinedModule(moduleObj){	
	it('Defined module', function() {
		assert.doesNotThrow(function(){
			require(moduleObj.path);
		});
	});
}

function testDefinedFunction(module, fn){
	return it('Defined function', function() {
		assert.notEqual(typeof module[fn] === 'function');
	});
}

function makeSafePass(){
	return '$!%"/$"/("·'.repeat(20);
}
