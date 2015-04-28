var calc = require('../src/calc.js');
var expect = require('chai').expect;

describe('calc', function() {
  var a = 4;
  var b = 2;

  it('should return a + b', function () {
    expect(calc.add(a, b)).to.eql(6);
  });

  it('should return a - b', function () {
    expect(calc.subtract(a, b)).to.eql(2);
  });

  it('should return a * b', function () {
    expect(calc.multiply(a, b)).to.eql(8);
  });

  it('should return a / b', function () {
    expect(calc.divide(a, b)).to.eql(2);
  });

});

