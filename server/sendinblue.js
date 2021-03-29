import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

console.log(' ');
console.log('   >> process.env.mailinblue_key 2: ', process.env.mailinblue_key);
console.log('   >> process.env.host_api ::', process.env.host_api);
console.log('  ');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.mailinblue_key;
// apiKey.apiKey = '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';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendinblue = (configEmail) => {
  apiInstance.sendTransacEmail(configEmail).then(function(data) {
    console.log(' ');
    console.log('   >> API called successfully. Returned data: ');
    console.log('   ', data);
    console.log('  ');
    return true;
  }, function(error) {
    console.log(' ');
    console.error('   >> Error ::', error);
    console.log(' ');
    return false;
  });
}

module.exports = sendinblue