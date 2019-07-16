//Utility functions for sending error and success responses

exports.sendSuccess = (successResposne, res) => {
  let messageJSON = JSON.stringify(successResposne);
  try {
    res.set('Connection', 'close');
    res.contentType('json');
  } catch (err) {
    console.log('Response error', err);
  }

	try {
    res.status(200).end(messageJSON);
  } catch (e) {
    res.end(messageJSON);
  }
};

exports.throwError = (err, res, statusCode) => {
  let errorResponse = {};
  errorResponse.code = err.code;
  errorResponse.message = err.message;
  
  let messageJSON = JSON.stringify(errorResponse);
  try {
    res.set('Connection', 'close');
    res.contentType('json');
  } catch (err) {
    console.log('Response error', err);
  }

	try {
    res.status(statusCode ? statusCode : 200).end(messageJSON);
  } catch (e) {
    res.end(messageJSON);
  }
};