const AWS = require("../../utils/AWS");

const getCredentialsForIdentity = async (userIdentityId, userIdToken) => {
  return AWS.cognitoIdentity
    .getCredentialsForIdentity({
      IdentityId: userIdentityId,
      Logins: {
        [AWS.IdentityProviderName]: userIdToken,
      },
    })
    .promise()
    .then((userCredential) => userCredential)
    .catch((errors) => {
      throw errors;
    });
};

module.exports = getCredentialsForIdentity;
