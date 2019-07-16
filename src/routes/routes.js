const router = require('express').Router();
const { sendSuccess, throwError } = require('../utils/response-util');

//import service
const { getCurrentWeather } = require('../services/open-weather-service');

//GET route for getJson api
router.get(['/getCurrentWeather'], async (req, res) => {
  try {
    let response = await getCurrentWeather();
    sendSuccess(response, res);
  } catch(err) {
    throwError(err, res);
  }
});

// exports section
module.exports = router;