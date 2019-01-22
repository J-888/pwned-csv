const assert = require('assert');

var pwned = { path: './pwned' };
var csvparser = { path: './csvparser' };

describe(pwned.path, function() {
	testDefinedModule(pwned);
	describe('#sha1Encrypt(password)', function() {
		testDefinedModule(pwned);
		pwned.module = require(pwned.path);
		it('Basic testbench', function() {
			/*sha1Test = [
				['0000', '39dfa55283318d31afe5a3ff4a0e3253e2045e43'],
				['1234', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'],
				['4321', 'd5f12e53a182c062b6bf30c1445153faff12269a'],
				['abcd', '81fe8bfe87576c3ecb22426f8e57847382917acf'],
				['ABCD', 'fb2f85c88567f3c8ce9b799c7c54642d0c7b41f6'],
				['@#!@#!', 'c4d4d5c6644c98518343d7f62fd6e42515f59f0b'],
				['#!@#!@', '05ec3c1d85d89892067ac510cc3c06be9b879c9b'],
			];

			for(let i=0;i<sha1Test.length;++i){
				assert.equal(pwned.sha1Encrypt(sha1Test[i][0]), sha1Test[i][1]);
			}*/
		});
	});
});

describe(csvparser.path, function() {
	testDefinedModule(csvparser);
	csvparser.module = require(csvparser.path);
	describe('#parsefile(file)', function() {
		testDefinedFunction(csvparser.module, 'parsefile');
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