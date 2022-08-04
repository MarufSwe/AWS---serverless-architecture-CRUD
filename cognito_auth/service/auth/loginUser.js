const AppSyncExceptions = require('../../utils/AppSyncExceptions');
const Validator = require("validatorjs");
const getCognitoInitAuth = require("../cognito/getCognitoInitAuth");
const getCognitoIdentity = require('../cognito/getCognitoIdentity');
const getCredentialsForIdentity = require('../cognito/getCredentialsForIdentity');
const UserIdentity = require('../../model/UserIdentity');

const loginUser = async ({ email = null, password = null }) => {

  try{
    checkValidation(email, password);
    const cognitoUserCredential = await getCognitoInitAuth(email,password);
    const userIdentityId = await getCognitoIdentity(cognitoUserCredential.IdToken);
    const userIdentityCredential = await getCredentialsForIdentity(userIdentityId,cognitoUserCredential.IdToken);
    return new UserIdentity({...userIdentityCredential.Credentials,...cognitoUserCredential});
  } catch(errors){
    throw errors
  }
  
};

const checkValidation = (email, password) => {
  let validation = new Validator(
    {
      email: email,
      password: password,
    },
    {
      email: "required|email",
      password: "required|min:8|max:32",
    }
  );
  if (validation.fails()) {
    throw new AppSyncExceptions(
      "ValidationExceptions",
      JSON.stringify(validation.errors)
    );
  }
};

module.exports = loginUser;
