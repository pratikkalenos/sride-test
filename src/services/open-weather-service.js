const request = require('request-promise');
const moment  = require('moment');

//Import model methods
const { insertFetchResult } = require('../models/fetch-result-model');

const getCurrentWeather = async () => {
  try {
    // Get Current date(day) and check if its a prime number
    let currentDay = moment().date();

    //Replace 'currentDay' with prime / non prime date to check the result
    if(isDayPrime(currentDay)) {
      //If the current day is prime get the current weather information
      let queryParams = { 
        q: 'pune', 
        appid: 'b6907d289e10d714a6e88b30761fae22' 
      };
      let currentWeather = await request({
        url: 'https://openweathermap.org/data/2.5/find',
        qs: queryParams,
        json: true
      });

      //save fetch result to db
      let fetchResult = {
        weather: currentWeather
      }
      await insertFetchResult(fetchResult);

      return currentWeather;
    } else {
      //If current day is not prime, throw error
      let err = new Error('Date is not prime.');
      err.code = 101;

      //save fetch result to db
      let fetchResult = {
        errorMessage: err.message
      }
      await insertFetchResult(fetchResult);
      
      throw err;
    } 
  } catch(err){
    console.log("Error getting current weather: ", err);
    throw err;
  }
}
 
let isDayPrime = day => {
  //Check if day is passed as an argument
  if(!day) {
    let err = new Error('Day is required.');
    err.code = 102;
    throw err;
  }

  //Check if its a valid day value
  if(day < 0 || day > 31) {
    let err = new Error('Day is not valid.');
    err.code = 103;
    throw err;
  }

  if(typeof(day) != 'number') {
    let err = new Error('Day should be a number.');
    err.code = 104;
    throw err;
  }

  /* 15/06/2019 (Pratik Kale) - Did not use logic 
     to check if day is prime as input is a fix number of values which will not change
  */
  let primeDays = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
  if(primeDays.includes(day)) {
    return true;
  } else {
    return false;
  }
}

exports.getCurrentWeather = getCurrentWeather;
exports.isDayPrime = isDayPrime;