let mongoose = require('../utils/mongo-connection');
let Schema = mongoose.Schema;

const FetchResultSchema = new Schema({  
  errorMessage: { type: String, default: null },
  fetchedAt: { type: Date, default: new Date() },
  weather: { type: Schema.Types.Mixed, default: {} }
});

let FetchResult = mongoose.model('fetchresults', FetchResultSchema);

const insertFetchResult = async fetchResult => {
  try {
    let fetchResultObject = new FetchResult({
      errorMessage: fetchResult.errorMessage ? fetchResult.errorMessage : null,
      weather: fetchResult.weather ? fetchResult.weather : {}
    });
    let newFetchResult = await fetchResultObject.save();
    return newFetchResult;
  } catch(err) {
    throw err;
  }
}

exports.insertFetchResult = insertFetchResult;