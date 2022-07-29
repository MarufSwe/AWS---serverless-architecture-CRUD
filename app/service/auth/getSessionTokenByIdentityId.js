const AppSyncExceptions = require('../../utils/AppSyncExceptions');
const Validator = require("validatorjs");
const getCredentialsForIdentity = require('../cognito/getCredentialsForIdentity');
const UserIdentity = require('../../model/UserIdentity');

const getSessionTokenByIdentityId = async (headers,identity) => {
  try{
    checkValidation(headers['x-id-token'] ?? '');
    const userIdentityCredential = await getCredentialsForIdentity(identity.cognitoIdentityId,headers['x-id-token']);
    return new UserIdentity({...userIdentityCredential,...userIdentityCredential.Credentials});
  } catch(errors){
    throw errors
  }
  
};

const checkValidation = (userIdToken) => {
  let validation = new Validator(
    {
      'x-id-token': userIdToken
    },
    {
      'x-id-token': "required"
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

module.exports = getSessionTokenByIdentityId;
