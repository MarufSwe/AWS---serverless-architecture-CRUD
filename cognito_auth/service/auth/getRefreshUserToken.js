const getCognitoIdentity = require('../cognito/getCognitoIdentity');
const getCredentialsForIdentity = require('../cognito/getCredentialsForIdentity');
const UserIdentity = require('../../model/UserIdentity');

const getRefreshUserToken = async (headers) => {

  try{
    const userIdentityId = await getCognitoIdentity(headers.authorization);
    const userIdentityCredential = await getCredentialsForIdentity(userIdentityId,headers.authorization);
    return new UserIdentity({...userIdentityCredential.Credentials});
  } catch(errors){
    throw errors
  }
  
};

module.exports = getRefreshUserToken;
