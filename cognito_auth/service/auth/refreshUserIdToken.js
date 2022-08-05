const AppSyncExceptions = require('../../utils/AppSyncExceptions');
const Validator = require("validatorjs");
const getCredentialsForIdentity = require('../cognito/getCredentialsForIdentity');
const getCognitoIdentity = require('../cognito/getCognitoIdentity');
const refreshCognitoInitAuthToken = require('../cognito/refreshCognitoInitAuthToken');
const UserIdentity = require('../../model/UserIdentity');


const refreshUserIdToken =async (headers)=>{
    try{
        checkValidation(headers['x-refresh-token'] ?? '');
        const getRefreshIdToken = await refreshCognitoInitAuthToken(headers['x-refresh-token']);
        const userIdentityId = await getCognitoIdentity(getRefreshIdToken.IdToken);
        const userIdentityCredential = await getCredentialsForIdentity(userIdentityId,getRefreshIdToken.IdToken);
        return new UserIdentity({...userIdentityCredential.Credentials,...getRefreshIdToken});
    }catch(errors){
        throw errors
    }
}

const checkValidation = (userRefreshToken) => {
    let validation = new Validator(
      {
        'x-refresh-token': userRefreshToken
      },
      {
        'x-refresh-token': "required"
      },
      { required: 'Valid :attribute header not provided.' }
    );
    if (validation.fails()) {
      throw new AppSyncExceptions(
        "HeaderRequestExceptions",
        JSON.stringify(validation.errors)
      );
    }
  };

module.exports = refreshUserIdToken