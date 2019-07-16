const assert = require('chai').assert;
const { isDayPrime } = require('../../src/services/open-weather-service');

describe('open-weather-service', () => {
  describe('isDayPrime', () => {
    it('Should return true', () => {
      let result = isDayPrime(17);
      assert.equal(result, true);
    });
  
    it('Should return false', () => {
      let result = isDayPrime(18);
      assert.equal(result, false);
    });
  
    it('Should throw error - Day is required.', () => {
      assert.throws(isDayPrime, Error, "Day is required.");
    });
  
    it('Should throw error - Day is not valid.', () => {
      assert.throws(function(){ isDayPrime(44) }, Error, "Day is not valid.");
    });
  
    it('Should throw error - Day should be a number.', () => {
      assert.throws(function(){ isDayPrime('fafafa') }, Error, "Day should be a number.");
    });
  });
});