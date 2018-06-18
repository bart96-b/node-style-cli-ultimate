const assert = require('assert');
const Logger = require('../src/styleCliUltimate');


describe('Тестирование без дополнительных параметров', () => {
  let logger = new Logger({dev:true});

  it('#1 - Null', () => assert.equal(logger.log(), undefined));
  it('#2 - Undefined', () => assert.equal(logger.log(null, undefined), ' null undefined'));
  it('#3 - String', () => assert.equal(logger.log('foo bar'), ' foo bar'));
  it('#4 - Number', () => assert.equal(logger.log(12345), undefined));
  it('#5 - Array', () => assert.equal(logger.log([true, 'foo', 1970, ['bar', 'baz']]), ' [true,foo,1970,bar,baz]'));
  it('#6 - Object', () => assert.equal(logger.log({color:'red'}), ' [object Object]'));
  it('#7 - Function', () => assert.equal(logger.log(foo => {return bar}), ' foo => {return bar}'));
  it('#8 - Boolean', () => assert.equal(logger.log(false), ' false'));
});
